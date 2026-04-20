import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Return true if previously authenticated
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (email, password) => {
    // Hardcoded credentials for simulation
    if (email === 'admin.gcit@rub.edu.bt' && password === '............') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      toast.success('Successfully signed in!');
      return true;
    } else {
      toast.error('Invalid email or password. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
