// backend/routes/communityRoutes.js
const express = require('express');
const router = express.Router();

// Hardcoded community posts (in-memory array)
let posts = [
  {
    id: "post1",
    author: {
      id: "user2",
      name: "Bob Smith",
      avatar: "https://via.placeholder.com/50?text=Bob",
      headline: "Data Scientist at DataMinds"
    },
    content: "Excited to share my latest findings on machine learning trends!",
    timestamp: Date.now() - 3600000
  },
  {
    id: "post2",
    author: {
      id: "user3",
      name: "Charlie Davis",
      avatar: "https://via.placeholder.com/50?text=Charlie",
      headline: "Product Manager at InnovateNow"
    },
    content: "Looking forward to our upcoming product launch. Innovation in progress!",
    timestamp: Date.now() - 7200000
  }
];

// GET /api/community => Return all posts
router.get('/', (req, res) => {
  res.json({ success: true, data: posts });
});

// POST /api/community => Create a new post
router.post('/', (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Create a new post object (in production, use a proper unique id and insert into DB)
  const newPost = {
    id: `post${posts.length + 1}`,
    author,
    content,
    timestamp: Date.now()
  };

  // Prepend the new post (latest first)
  posts = [newPost, ...posts];
  res.json({ success: true, message: 'Post created successfully', data: newPost });
});

module.exports = router;
