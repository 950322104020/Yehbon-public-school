import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Double-Check: Ensure the base URL maps cleanly
if (baseURL && !baseURL.endsWith('/api')) {
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}

console.log("DEFINITIVE BASE URL =", baseURL); 

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

// Foolproof Interceptor: Automatically collapses duplicate /api/api/ paths
api.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('/api')) {
    // If the component requests '/api/notices', remove the duplicate prefix
    config.url = config.url.replace(/^\/api/, '');
  }
  return config;
}, (error) => {
  return Promise.all([Promise.reject(error)]);
});

export default api;