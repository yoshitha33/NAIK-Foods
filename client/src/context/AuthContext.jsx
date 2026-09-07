import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAPI, registerAPI } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('naik_user');
    return saved ? JSON.parse(saved) : null;
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('naik_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('naik_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const userData = await loginAPI(email, password);
      setUser(userData);
      addToast(`Welcome back, ${userData.name}!`, 'success');
      return userData;
    } catch (error) {
      addToast(error.message || 'Login failed', 'error');
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const googleUser = {
        _id: 'usr_google_' + Date.now(),
        name: 'Aniket Naik (Google)',
        email: 'aniket.naik@gmail.com',
        mobile: '9820098200',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        role: 'customer',
        token: 'mock_jwt_google_token_naik_foods_2026'
      };
      setUser(googleUser);
      addToast('Signed in with Google successfully! Welcome Aniket.', 'success');
      return googleUser;
    } catch (error) {
      addToast('Google login failed', 'error');
    }
  };

  const register = async (name, email, mobile, password) => {
    try {
      const userData = await registerAPI(name, email, mobile, password);
      setUser(userData);
      addToast(`Account created successfully! Welcome ${userData.name}.`, 'success');
      return userData;
    } catch (error) {
      addToast(error.message || 'Registration failed', 'error');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    addToast('You have been signed out.', 'info');
  };

  const updateUserAddresses = (newAddresses) => {
    if (user) {
      const updated = { ...user, addresses: newAddresses };
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        googleLogin,
        register,
        logout,
        updateUserAddresses
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
