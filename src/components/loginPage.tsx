// import React, { useState, FormEvent } from 'react';
// import { loginUser } from '../api/loginService';
// import { TextField, Button, Snackbar, Alert, Box, CircularProgress, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom'; 

// interface LoginData {
//   login: string;
//   password: string;
// }

// const LoginPage: React.FC = () => {
//   const [login, setLogin] = useState<string>(''); 
//   const [password, setPassword] = useState<string>(''); 
//   const [error, setError] = useState<string>(''); 
//   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); 
//   const [isLoading, setIsLoading] = useState<boolean>(false);  
//   const navigate = useNavigate(); 

//   const handleLogin = async (e: FormEvent) => { 
//     e.preventDefault();
//     setIsLoading(true);  
//     try {
//       const credentials: LoginData = { login, password }; 
//       await loginUser(credentials); 
//       navigate('/dashboard');
//     } catch (error) {
//       setError('Login failed. Please try again.');
//       setOpenSnackbar(true);
//     } finally {
//       setIsLoading(false);  
//     }
//   };

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width: '100%', maxWidth: 400 }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         Login
//       </Typography>
      
//       <form onSubmit={handleLogin} style={{ width: '100%' }}>
//         <TextField
//           label="Login"
//           type="text"
//           value={login}
//           onChange={(e) => setLogin(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           fullWidth
//           disabled={isLoading}  
//           sx={{ mt: 2 }}
//         >
//           {isLoading ? <CircularProgress size={24} /> : 'Login'}
//         </Button>
//       </form>

//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default LoginPage;

import React, { useState, FormEvent } from 'react';
import { loginUser } from '../api/loginService';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useError } from '../context/ErrorContext.tsx';  

interface LoginData {
  login: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(false);  
  const navigate = useNavigate(); 

  const { showError } = useError();  

  const handleLogin = async (e: FormEvent) => { 
    e.preventDefault();
    setIsLoading(true);  
    try {
      const credentials: LoginData = { login, password }; 
      await loginUser(credentials); 
      navigate('/dashboard');
    } catch (error) {
      showError('Login failed. Please try again.', 'error');  
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Login
      </Typography>
      
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={isLoading}  
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
