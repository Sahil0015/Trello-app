/**
 * index.js - Application Entry Point
 * Renders the main App component into the DOM
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
