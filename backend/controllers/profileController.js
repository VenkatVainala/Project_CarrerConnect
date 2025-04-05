// controllers/profileController.js
const db = require('../config/db'); // Your DB connection

exports.getProfile = (req, res) => {
  const userId = req.user.id; // assuming you have user info from auth middleware
  const query = 'SELECT fullName, email, education, skills, experience, careerGoals FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!results.length) return res.status(404).json({ error: 'Profile not found' });
    res.json(results[0]);
  });
};

exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { fullName, email, education, skills, experience, careerGoals } = req.body;
  // For resume file, you would handle file upload (using multer or similar)
  const query = 'UPDATE users SET fullName = ?, email = ?, education = ?, skills = ?, experience = ?, careerGoals = ? WHERE id = ?';
  db.query(query, [fullName, email, education, skills, experience, careerGoals, userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Profile updated successfully' });
  });
};
