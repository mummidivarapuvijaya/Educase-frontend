import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://educase-backend-mi9p.onrender.com/api';

const getPlatform = () => {
  if (typeof window === 'undefined') return 'web';
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }
  
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  if (window.innerWidth > 1024) {
    return 'desktop';
  }
  
  return 'web';
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'web_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Platform': getPlatform(),
    'X-Device-Id': getDeviceId(),
    'X-App-Version': process.env.REACT_APP_VERSION || '1.0.0'
  }
});

export const signupUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Signup failed');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Signup failed');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

export default api;
