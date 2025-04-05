// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username, password });
      // Store token and username in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setMessage('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage(err.error || 'Error occurred during login');
    }
  };

  return (
    <div className="auth-form-container login-card">
      <h2>Sign In to CareerConnect</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign In
        </button>
      </form>
      <div className="social-login">
        <p>Or sign in with:</p>
        <button className="btn btn-social google">Google</button>
        <button className="btn btn-social linkedin">LinkedIn</button>
      </div>
      <div className="redirect-register">
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="link">
            Register here
          </span>
        </p>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginPage;
