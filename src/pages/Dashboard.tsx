import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Welcome to the Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Stores
          </Typography>
          <Link to="/stores" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                ':hover': { backgroundColor: 'primary.dark' }, 
                padding: '10px 20px' 
              }}
            >
              Manage Stores
            </Button>
          </Link>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Customers
          </Typography>
          <Link to="/customers" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                ':hover': { backgroundColor: 'secondary.dark' }, 
                padding: '10px 20px' 
              }}
            >
              Manage Customers
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
