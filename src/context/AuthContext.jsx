import React, { createContext, useState, useEffect } from 'react';
import { removeToken, setToken, getToken } from '../services/tokenService';
import { sendLogout, validateToken } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const token = getToken()
      if (token) {
        const response = await validateToken()
        if(response.status === 200) {
          setIsAuthenticated(true)
        } else {
          removeToken()
        }
      }
    }

    validate();
  }, []);

  const login = (token) => {
    setToken(token)
    setIsAuthenticated(true)
  };

  const logout = async () => {
    sendLogout()
    removeToken()
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
