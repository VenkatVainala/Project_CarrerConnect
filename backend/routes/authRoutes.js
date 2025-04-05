// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Adjust path if needed

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Execute the query using the promise-based pool
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];
    // For demonstration purposes, we're doing a plain text comparison.
    // In production, use a password hashing library like bcrypt.
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // On successful login, return a fake token (replace with JWT in production)
    res.json({ token: 'fake-jwt-token', username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    if (!username || !password || !role) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Insert the new user into the database (plain text for demo)
    await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    res.json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
