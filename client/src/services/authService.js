import { storageService } from './storageService';
import { api } from '../lib/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/v1/auth/login', { email, password });
      const { user, token } = response.data.data;
      
      const sessionData = {
        ...user,
        token
      };
      
      storageService.setSession(sessionData);
      return sessionData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData, role) => {
    try {
      const userWithRole = {
        ...userData,
        role
      };

      const response = await api.post('/v1/auth/register', userWithRole);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/v1/auth/logout');
    } catch (error) {
      console.warn("Logout request failed, clearing local session anyway");
    } finally {
      storageService.clearSession();
    }
  },

  getCurrentUser: () => {
    return storageService.getCurrentSession();
  },

  getProfile: async () => {
    try {
      const response = await api.get('/v1/auth/profile');
      return response.data.data.user;
    } catch (error) {
      throw new Error('Failed to load profile');
    }
  }
};
