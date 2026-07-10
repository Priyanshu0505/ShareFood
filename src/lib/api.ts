import axios from 'axios';

// 🌟 Environment Variable set kiya taaki production me Render ka URL uthaye aur local me localhost
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

// Agar local storage me token hai toh automatic har request ke sath chala jayega
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;