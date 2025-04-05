// frontend/src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';
const AUTH_URL = 'http://localhost:5000/api/auth';

export const getJobs = async () => {
  const response = await axios.get(`${API_BASE}/jobs`);
  return response.data;
};

export const getProfile = async () => {
  const userId = localStorage.getItem('userId'); // Ensure you store the user's id when logging in
  const response = await axios.get(`${API_BASE}/profile?userId=${userId}`);
  return response.data;
};


export const getCommunityPosts = async () => {
  const response = await axios.get(`${API_BASE}/community`);
  return response.data;
};


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};