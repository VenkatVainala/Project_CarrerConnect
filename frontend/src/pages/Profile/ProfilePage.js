// src/pages/Profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  // Retrieve the userId (for testing, we use 'defaultUserId' if not set)
  const userId = localStorage.getItem('userId') || 'defaultUserId';
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lockMessage, setLockMessage] = useState('');

  // Initialize form data state
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    headline: '',
    summary: '',
    connectionsCount: 0,
    experience: '', // JSON string (e.g., '[]')
    education: ''   // JSON string (e.g., '[]')
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile?userId=${userId}`);
        if (response.data.success) {
          const data = response.data.data;
          if (Object.keys(data).length === 0) {
            // No profile exists: allow editing to create a profile
            setProfile(null);
            setIsEditing(true);
          } else {
            setProfile(data);
            setFormData({
              name: data.name || '',
              avatar: data.avatar || '',
              headline: data.headline || '',
              summary: data.summary || '',
              connectionsCount: data.connectionsCount || 0,
              experience: data.experience ? JSON.stringify(data.experience) : '',
              education: data.education ? JSON.stringify(data.education) : ''
            });
            // Lock the form after loading an existing profile
            setIsEditing(false);
            setLockMessage('Your profile has been submitted and locked. Click "Edit Profile" to make changes.');
          }
        } else {
          setError('Failed to fetch profile.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setLockMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const expParsed = formData.experience ? JSON.parse(formData.experience) : [];
      const eduParsed = formData.education ? JSON.parse(formData.education) : [];
      if (!profile) {
        // Create new profile (POST)
        const response = await axios.post('http://localhost:5000/api/profile', {
          userId,
          ...formData,
          experience: expParsed,
          education: eduParsed
        });
        if (response.data.success) {
          alert('Profile created successfully!');
          setProfile(response.data.data || formData);
          setIsEditing(false);
          setLockMessage('Your profile has been submitted and locked. Click "Edit Profile" to make changes.');
        }
      } else {
        // Update profile (PUT)
        const response = await axios.put('http://localhost:5000/api/profile', {
          userId,
          ...formData,
          experience: expParsed,
          education: eduParsed
        });
        if (response.data.success) {
          alert('Profile updated successfully!');
          setIsEditing(false);
          setLockMessage('Your profile has been updated and locked. Click "Edit Profile" to make further changes.');
        }
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Error saving profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-page container">
      <h1>My Profile</h1>
      {lockMessage && <p className="lock-message">{lockMessage}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Avatar URL:</label>
          <input 
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Enter avatar URL"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Headline:</label>
          <input 
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Enter your headline"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Summary:</label>
          <textarea 
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Enter your summary"
            disabled={!isEditing}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Connections Count:</label>
          <input 
            type="number"
            name="connectionsCount"
            value={formData.connectionsCount}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Experience (JSON):</label>
          <textarea 
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder='e.g., [{"company": "TechCorp", "role": "Engineer", "duration": "2 years"}]'
            disabled={!isEditing}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Education (JSON):</label>
          <textarea 
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder='e.g., [{"school": "University", "degree": "B.Sc", "year": "2019"}]'
            disabled={!isEditing}
          ></textarea>
        </div>
        {isEditing ? (
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={handleEdit}>
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
