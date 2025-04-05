// frontend/src/pages/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password, role });
      setMessage('Registration successful!');
      navigate('/login');
    } catch (err) {
      setMessage(err.error || 'Error occurred during registration');
    }
  };

  return (
    <div className="auth-form-container register-card">
      <h2>Create an Account</h2>
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
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterPage;
