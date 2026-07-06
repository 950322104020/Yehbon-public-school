import axios from 'axios';

const api = axios.create({
  // Automatically detects if there's a live cloud variable, otherwise falls back to local testing
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Auto-inject JWT security token into outgoing headers
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