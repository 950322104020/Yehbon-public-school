import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Foolproof Check: Force append /api if the environment variable forgot it
if (baseURL && !baseURL.endsWith('/api')) {
  // Strip any trailing slash first, then add /api
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}

console.log("DEFINITIVE BASE URL =", baseURL); 

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

export default api;