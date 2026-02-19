import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from local storage
useEffect(() => {
  const token = localStorage.getItem('uniqueofy_access_token');

  if (token) {
    setIsAuthenticated(true);

    api.get('/auth/me')
      .then(res => {
        setUser(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem('uniqueofy_access_token');
        setUser(null);
        setIsAuthenticated(false);
      });
  }
}, []);



  const sendOtp = async (phone) => {
    try {
      await api.post('/auth/send-otp', { phone });
      return { success: true };
    } catch (error) {
      console.error('Send OTP failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send OTP' 
      };
    }
  };

  const verifyOtp = async (phone, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { phone, otp });
      // Backend returns: { success: true, message: '...', data: { accessToken, user } }
      const { accessToken, user: userData } = response.data.data;

      localStorage.setItem('uniqueofy_access_token', accessToken);
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Verify OTP failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to verify OTP' 
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('uniqueofy_access_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedUser) => {
  setUser(updatedUser);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    sendOtp,
    verifyOtp,
    logout,
    updateUser
  }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
