import axios from 'axios';
import { storageService } from '@/services/storageService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Configured Axios instance for future backend integration.
 * Currently serves as a placeholder until Express backend is attached.
 */
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject JWT token
api.interceptors.request.use(
  (config) => {
    const session = storageService.getCurrentSession();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storageService.clearSession();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
