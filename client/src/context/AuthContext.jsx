import React, { createContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { storageService } from '@/services/storageService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const session = authService.getCurrentUser();
        if (session && session.token) {
          const profile = await authService.getProfile();
          const updatedSession = { ...profile, token: session.token };
          authService.setSession?.(updatedSession) || storageService.setSession(updatedSession);
          setUser(updatedSession);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.warn("Session expired or invalid token");
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    hydrateAuth();
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (userData, role) => {
    const newUser = await authService.register(userData, role);
    return newUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
