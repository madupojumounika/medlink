import { storageService } from './storageService';

// Mock authentication delays to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    await delay(1000); // Simulate network
    
    // In a real app, this would be an API call verifying the password hash
    const users = storageService.getUsers();
    let user = users.find(u => u.email === email);

    // Hardcoded bypass for testing
    if (!user) {
      const defaultUsers = [
        { id: 'usr_doctor', email: 'doctor@test.com', password: 'password123', role: 'doctor', fullName: 'Dr. Sarah Connor' },
        { id: 'usr_hospital', email: 'hospital@test.com', password: 'password123', role: 'hospital', hospitalName: 'City General' },
        { id: 'usr_ambulance', email: 'ambulance@test.com', password: 'password123', role: 'ambulance', driverName: 'Mike Johnson' },
        { id: 'usr_admin', email: 'admin@test.com', password: 'password123', role: 'admin', adminName: 'System Admin' }
      ];
      user = defaultUsers.find(u => u.email === email);
    }

    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Remove password from session object
    const { password: _, ...userWithoutPassword } = user;
    storageService.setSession(userWithoutPassword);
    
    return userWithoutPassword;
  },

  register: async (userData, role) => {
    await delay(1500); // Simulate network

    const userWithRole = {
      ...userData,
      role
    };

    const newUser = storageService.saveUser(userWithRole);
    return newUser;
  },

  logout: async () => {
    await delay(500);
    storageService.clearSession();
  },

  getCurrentUser: () => {
    return storageService.getCurrentSession();
  }
};
