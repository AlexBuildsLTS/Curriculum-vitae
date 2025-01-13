/****************************************************
 * index.js (Node/Express server with MariaDB + JWT)
 ****************************************************/
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// 1) ENV variables or fallback defaults
const JWT_SECRET = process.env.JWT_SECRET || 'SUPER_SECRET';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'meetingsdb';
const DB_PORT = process.env.DB_PORT || 3306; // If needed

let pool;

// 2) Create a connection pool
async function initDB() {
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
}
initDB().catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
});

// 3) Helper: create a JWT
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

// 4) Middlewares
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

/****************************************************
 * ROUTES
 ****************************************************/


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


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = createToken({ id: user.id, role: user.role });
        return res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// C) GET /api/meetings (public - no auth needed)
app.get('/api/meetings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM meetings ORDER BY date, time');
        // If participants is stored comma-separated, you can parse here if you want
        // but we'll just return as is for now
        res.json(
            rows.map((m) => ({
                ...m,
                participants: m.participants ? m.participants.split(',') : [],
            }))
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot fetch meetings' });
    }
});

// D) POST /api/meetings (needs auth)
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
        // fetch inserted row
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
        const [result] = await pool.query(`DELETE FROM meetings WHERE id=?`, [meetingId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot delete meeting' });
    }
});

// (Optional) GET /api/users (admin only)
app.get('/api/users', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT id, username, role FROM users`);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot fetch users' });
    }
});

/****************************************************
 * Start the server
 ****************************************************/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
