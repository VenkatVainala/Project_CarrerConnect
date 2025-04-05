// backend/config/db.js
const mysql = require('mysql2/promise'); // Use the promise-based API
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'careerconnect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: Test the connection with a simple query
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('Connected to MySQL');
  } catch (error) {
    console.error('MySQL pool error:', error.message);
  }
})();

module.exports = pool;
