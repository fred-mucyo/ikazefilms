import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateToken = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.id && userData.username) {
        setUser(userData);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = existingUsers.find(
        (u) => u.username === username && u.password === password,
      );

      if (user) {
        const token = btoa(
          JSON.stringify({ id: user.id, username: user.username }),
        );
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        return { success: true, user: user };
      } else {
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(
        (u) => u.username === username || u.email === email,
      );

      if (userExists) {
        return { success: false, error: 'Username or email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        created_at: new Date().toISOString(),
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return {
        success: true,
        message: 'Registration successful! You can now login.',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed. Please try again.',
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  const updateUserData = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));

    // Update in users array as well
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = existingUsers.map((u) =>
      u.id === user.id ? newUserData : u,
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUserData,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
