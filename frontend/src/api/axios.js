/**
 * axios.js - Axios Instance Configuration
 * 
 * Creates a pre-configured axios instance that:
 * - Points to our FastAPI backend
 * - Uses environment variable or deployed URL
 * - Sets default headers for JSON communication
 */

import axios from 'axios';

// API Base URL - uses environment variable or defaults to deployed backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://trello-backend-production.up.railway.app';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
