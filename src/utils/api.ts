import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';   
import { useTheme } from '../contexts/ThemeContext';
import { Meeting } from '../types/Meeting'; // Use imported Meeting interface
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Create an axios instance with default settings
const api = axios.create({
  baseURL: 'https://example.com/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default api;
