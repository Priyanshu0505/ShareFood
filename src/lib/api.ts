import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Humara Express Backend URL
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