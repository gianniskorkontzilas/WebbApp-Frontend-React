import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  auth: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
    setLoading(false); 
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
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
