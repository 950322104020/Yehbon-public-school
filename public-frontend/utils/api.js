import axios from 'axios';
let baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
if (baseURL && !baseURL.endsWith('/api')) {
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}
const api = axios.create({ baseURL });
export default api;