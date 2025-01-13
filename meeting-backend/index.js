/****************************************************
 * index.js (Node/Express + MariaDB + JWT)
 ****************************************************/
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();

// Configure CORS to allow requests from your Netlify frontend
app.use(
    cors({
        origin: 'https://alexvite.netlify.app/', // Your Netlify frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

// Middleware to parse JSON
app.use(express.json());

// ENV variables or fallback defaults
const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjc2NzM3MSwiZXhwIjoxNzM2ODUzNzcxfQ.nuypcFggW6eQZc_BJR9y5Ijcxnj0y1-utbBn5EhzF94';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_NAME = process.env.DB_NAME || 'meetingsdb';
const DB_PORT = process.env.DB_PORT || 3306;

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

// Helper to create JWT
function createToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// Middlewares
function authMiddleware(req, res, next) {
    const header = req.header('Authorization');
    if (!header) {
        return res.status(401).json({ error: 'No authorization header' });
    }
    const token = header.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { userId, role }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

function adminOnly(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Admin only' });
    }
}

// Routes
// A) Create an admin user
app.post('/api/create-admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `INSERT INTO users (username, password_hash, role) VALUES (?, ?, 'admin')`,
            [username, hash]
        );
        res.json({ success: true, userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating admin' });
    }
});

// B) Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch user by username from the database
        const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username]);

        // Check if the user exists
        if (rows.length === 0) {
            console.log('User not found:', username);
            return res.status(400).json({ error: 'User not found' });
        }

        const user = rows[0];


        const match = await bcrypt.compare(password, user.password_hash);
        console.log('Password Match:', match); // Log the result of bcrypt comparison


        if (!match) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // If passwords match, generate a JWT token
        const token = createToken({ id: user.id, role: user.role });
        return res.json({ token, role: user.role });
    } catch (err) {
        console.error(err); // Log server-side errors
        return res.status(500).json({ error: 'Server error' });
        const match = await bcrypt.compare(password, user.password_hash);
        console.log('Password Match:', match);
    }

});


// C) GET /api/meetings (public)
app.get('/api/meetings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM meetings ORDER BY date, time');
        const mapped = rows.map((m) => ({
            ...m,
            participants: m.participants ? m.participants.split(',') : [],
        }));
        res.json(mapped);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot fetch meetings' });
    }
});

// D) POST /api/meetings (auth required)
app.post('/api/meetings', authMiddleware, async (req, res) => {
    const { title, date, time, level, participants, description } = req.body;
    try {
        const participantsString = participants.join(',');
        const [result] = await pool.query(
            `INSERT INTO meetings
                 (title, date, time, level, participants, description, creator_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, date, time, level, participantsString, description, req.user.userId]
        );
        const newId = result.insertId;
        const [rows] = await pool.query('SELECT * FROM meetings WHERE id=?', [newId]);
        const row = rows[0];
        row.participants = row.participants ? row.participants.split(',') : [];
        res.status(201).json(row);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot create meeting' });
    }
});

// E) DELETE /api/meetings/:id (admin only)
app.delete('/api/meetings/:id', authMiddleware, adminOnly, async (req, res) => {
    const meetingId = parseInt(req.params.id, 10);
    try {
        const [result] = await pool.query('DELETE FROM meetings WHERE id=?', [meetingId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot delete meeting' });
    }
});
app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `INSERT INTO users (username, password_hash, role) VALUES (?, ?, 'user')`,
            [email, hash]
        );
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            res.status(400).json({ error: "User already exists." });
        } else {
            console.error(err);
            res.status(500).json({ error: "Server error." });
        }
    }
});

// Optional: GET /api/users (admin only)
app.get('/api/users', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, role FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot fetch users' });
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
