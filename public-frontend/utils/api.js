import axios from 'axios';

const api = axios.create({
  // Ensures Vercel uses the production environment variable with the required /api suffix
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

export default api;