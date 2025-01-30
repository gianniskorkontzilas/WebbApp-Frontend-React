import React, { useState } from 'react';
import { useAuth } from '../context/authContext.tsx';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../api/axiosInstance.ts';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosinstance.post('http://localhost:8080/api/auth/login', { login, password });
      const token = response.data.token;
  
      console.log('Received Token:', token);  
  
      if (token) {
        localStorage.setItem('token', token);  
        console.log('Token saved to localStorage:', token);  
      } else {
        console.error('No token received from the API');
      }
  
      loginContext(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid login credentials');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
