// src/pages/Community/CommunityPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityPage.css';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Dummy logged-in user details from localStorage (or hardcode for demo)
  const loggedInUser = {
    id: localStorage.getItem('userId') || 'user-default',
    name: localStorage.getItem('username') || 'Anonymous',
    avatar: 'https://via.placeholder.com/50?text=User',
    headline: 'Member'
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/community');
        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          setError('Failed to fetch posts.');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Error fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return; // Prevent empty posts

    try {
      const response = await axios.post('http://localhost:5000/api/community', {
        author: loggedInUser,
        content: newPostContent.trim()
      });
      if (response.data.success) {
        // Add new post to the beginning of the posts list
        setPosts([response.data.data, ...posts]);
        setNewPostContent('');
      } else {
        setError('Failed to create post.');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Error creating post.');
    }
  };

  return (
    <div className="community-container container">
      <h1>Community & Mentorship</h1>

      {/* New Post Form */}
      <div className="post-form">
        <form onSubmit={handlePostSubmit}>
          <textarea
            placeholder="Write your post here..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows="4"
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>

      <div className="button-group">
        <button className="btn-discussion">Start a Discussion</button>
        <button className="btn-mentor">Find a Mentor</button>
      </div>

      <div className="search-input">
        <input type="text" placeholder="Search discussions or mentors" />
      </div>

      <div className="tabs">
        <button className="active">Discussions</button>
        <button>Mentors</button>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className="error">{error}</p>}

      <div className="discussions">
        {posts.map((post) => (
          <div key={post.id} className="discussion-card">
            <h3>
              {post.content.length > 40 ? post.content.slice(0, 40) + '...' : post.content}
            </h3>
            <p>
              {post.author.name} • {post.author.headline} •{' '}
              {Math.floor((Date.now() - post.timestamp) / 3600000)} hours ago
            </p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
