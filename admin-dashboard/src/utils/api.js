import axios from 'axios';

const api = axios.create({
  // Clean off the trailing /api route since components define it explicitly
  baseURL: 'http://localhost:5000',
});

// Automatically inject JWT token into header request parameters
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;