import React, { useState } from 'react';
import { useAuth } from '../context/authContext.tsx';
import { TextField, Button, Snackbar, Alert, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../api/axiosInstance.ts';

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const { login: loginContext } = useAuth();
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosinstance.post<LoginResponse>('http://localhost:8080/api/auth/login', { login, password });
      
      const token = response.data.token;

      console.log('Λήψη Token:', token);

      if (token) {
        localStorage.setItem('token', token);  
        console.log('Token αποθηκεύτηκε στο localStorage:', token);  
      } else {
        console.error('Δεν ελήφθη token από την API');
      }

      loginContext(token);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Σφάλμα κατά το login:', error);
      setError('Μη έγκυρα στοιχεία σύνδεσης');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h4" color="primary">Σύνδεση</Typography>
      </Box>

      <form onSubmit={handleLogin}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Όνομα χρήστη"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="Κωδικός"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Σύνδεση
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
    </Container>
  );
};

export default Login;



