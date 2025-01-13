require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: 'https://alexvite.netlify.app', // Replace with your frontend's URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

// Environment Variables
const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;

// Database Connection
let pool;
(async function initDB() {
    try {
        pool = await mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0,
        });
        console.log('Connected to MariaDB');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
})();

// Helper: Create JWT Token
function createToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

// Middleware: Authenticate Token
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Middleware: Admin Only
function adminOnly(req, res, next) {
    if (req.user.role === 'admin') return next();
    res.status(403).json({ error: 'Access denied' });
}

// Routes
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, "user")', [
            username,
            hashedPassword,
        ]);
        res.status(201).json({ id: result.insertId, message: 'User created' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Username already exists' });
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = createToken({ id: user.id, role: user.role });
        res.json({ token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/users', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, username, role FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
