// backend/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Promise-based pool from mysql2/promise

// GET profile: Retrieve profile for given userId (if exists)
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ success: false, error: 'Missing userId' });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM profiles WHERE userId = ?', [userId]);
    if (rows.length === 0) {
      // Return empty object if profile does not exist
      return res.json({ success: true, data: {} });
    }
    const profile = rows[0];
    
    // Only parse if the field is a string
    if (profile.experience && typeof profile.experience === 'string') {
      profile.experience = JSON.parse(profile.experience);
    }
    if (profile.education && typeof profile.education === 'string') {
      profile.education = JSON.parse(profile.education);
    }
    
    // Alternatively, if these columns are already JSON objects, no need to parse.
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


// POST profile: Create a new profile
router.post('/', async (req, res) => {
  const { userId, name, avatar, headline, summary, connectionsCount, experience, education } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, error: 'Missing userId' });
  }
  try {
    const expString = experience ? JSON.stringify(experience) : '[]';
    const eduString = education ? JSON.stringify(education) : '[]';
    await pool.query(
      'INSERT INTO profiles (userId, name, avatar, headline, summary, connectionsCount, experience, education) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, name || '', avatar || '', headline || '', summary || '', connectionsCount || 0, expString, eduString]
    );
    res.json({ success: true, message: 'Profile created successfully!' });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});


// PUT profile: Update an existing profile
router.put('/', async (req, res) => {
  const { userId, name, avatar, headline, summary, connectionsCount, experience, education } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, error: 'Missing userId' });
  }
  try {
    const expString = experience ? JSON.stringify(experience) : '[]';
    const eduString = education ? JSON.stringify(education) : '[]';
    await pool.query(
      'UPDATE profiles SET name = ?, avatar = ?, headline = ?, summary = ?, connectionsCount = ?, experience = ?, education = ? WHERE userId = ?',
      [name || '', avatar || '', headline || '', summary || '', connectionsCount || 0, expString, eduString, userId]
    );
    res.json({ success: true, message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
