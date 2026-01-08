/**
 * axios.js - Axios Instance Configuration
 * 
 * Creates a pre-configured axios instance that:
 * - Points to our FastAPI backend (localhost:8000)
 * - Sets default headers for JSON communication
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000',  // FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
