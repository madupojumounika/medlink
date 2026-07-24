// Mock database using localStorage
const USERS_KEY = 'medlink_users';
const SESSION_KEY = 'medlink_session';

export const storageService = {
  getCurrentSession: () => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  setSession: (user) => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving session', error);
    }
  },

  clearSession: () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error clearing session', error);
    }
  }
};
