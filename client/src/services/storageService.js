// Mock database using localStorage
const USERS_KEY = 'medlink_users';
const SESSION_KEY = 'medlink_session';

export const storageService = {
  getUsers: () => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      if (users) {
        const parsed = JSON.parse(users);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      
      // Seed with default users if empty
      const defaultUsers = [
        { id: 'usr_doctor', email: 'doctor@test.com', password: 'password123', role: 'doctor', fullName: 'Dr. Sarah Connor' },
        { id: 'usr_hospital', email: 'hospital@test.com', password: 'password123', role: 'hospital', hospitalName: 'City General' },
        { id: 'usr_ambulance', email: 'ambulance@test.com', password: 'password123', role: 'ambulance', driverName: 'Mike Johnson' },
        { id: 'usr_admin', email: 'admin@test.com', password: 'password123', role: 'admin', adminName: 'System Admin' }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    } catch {
      return [];
    }
  },

  saveUser: (user) => {
    try {
      const users = storageService.getUsers();
      // Check if email already exists
      if (users.find(u => u.email === user.email)) {
        throw new Error('Email already registered');
      }
      
      const newUser = {
        ...user,
        id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return newUser;
    } catch (error) {
      throw error;
    }
  },

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
