// src/axiosConfig.js
import axios from 'axios';


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL of the backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add dynamic Basic Auth header to every request
axiosInstance.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

    if (username && password) {
    const token = btoa(`${username}:${password}`); // Base64 encode username and password
    config.headers['Authorization'] = `Basic ${token}`; // Add dynamic Basic Auth header
  }

  return config;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});

export default axiosInstance;

