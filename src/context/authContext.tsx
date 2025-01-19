import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  auth: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false); 

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  
  const login = (token: string) => {
    localStorage.setItem('token', token); 
    setAuth(true); 
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    setAuth(false); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
