require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// ENV variables or fallback defaults
const JWT_SECRET = process.env.JWT_SECRET;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_NAME = process.env.DB_NAME || 'meetingsdb';
const DB_PORT = process.env.DB_PORT || 3306;

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables.');
    process.exit(1);
}

// Create a connection pool
let pool;
async function initDB() {
    try {
        pool = await mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            port: DB_PORT,
            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0,
        });
        console.log('Connected to MariaDB pool');
    } catch (err) {
        console.error('Failed to connect to DB:', err);
        process.exit(1);
    }
}
initDB();

// Configure CORS
app.use(
    cors({
        origin: 'https://alexvite.netlify.app/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

// Middleware to parse JSON
app.use(express.json());

// Helper to create JWT
function createToken(user) {
    return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

// Authentication Middleware
function authMiddleware(req, res, next) {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ error: 'Authorization header missing' });

    const token = header.replace('Bearer ', '');
    try {
        req.user = jwt.verify(token, JWT_SECRET); // Attach user info to the request
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Admin Middleware
function adminOnly(req, res, next) {
    if (req.user?.role === 'admin') next();
    else res.status(403).json({ error: 'Admin access required' });
}

// Routes

// A) Create Admin User
app.post('/api/create-admin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'All fields are required' });

    try {
        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `INSERT INTO users (username, password_hash, role) VALUES (?, ?, 'admin')`,
            [username, hash]
        );
        res.json({ success: true, userId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'User already exists' });
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// B) User Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'All fields are required' });

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = createToken(user);
        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// C) Get Meetings (Public)
app.get('/api/meetings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM meetings ORDER BY date, time');
        res.json(
            rows.map((meeting) => ({
                ...meeting,
                participants: meeting.participants ? meeting.participants.split(',') : [],
            }))
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot fetch meetings' });
    }
});

// D) Create Meeting (Auth Required)
app.post('/api/meetings', authMiddleware, async (req, res) => {
    const { title, date, time, level, participants, description } = req.body;
    if (!title || !date || !time || !level) return res.status(400).json({ error: 'Missing required fields' });

    try {
        const [result] = await pool.query(
            `INSERT INTO meetings (title, date, time, level, participants, description, creator_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, date, time, level, participants.join(','), description, req.user.userId]
        );
        const [rows] = await pool.query('SELECT * FROM meetings WHERE id=?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot create meeting' });
    }
});

// E) Delete Meeting (Admin Only)
app.delete('/api/meetings/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM meetings WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Meeting not found' });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot delete meeting' });
    }
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
