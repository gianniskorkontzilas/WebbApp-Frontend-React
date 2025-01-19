import React, { useState, FormEvent } from 'react';
import { loginUser } from '../api/loginService';
import { TextField, Button, Snackbar, Alert, Box } from '@mui/material';

interface LoginData {
  login: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string>(''); 
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); 

  const handleLogin = async (e: FormEvent) => { 
    e.preventDefault();
    try {
      const credentials: LoginData = { login, password }; 
      await loginUser(credentials); 
      window.location.href = '/dashboard'; 
    } catch (error) {
      setError('Login failed. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Login"
          type="text"
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
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
