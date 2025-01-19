import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>

      <div>
        <h3>Stores</h3>
        <Link to="/stores">
          <Button variant="contained" color="primary">
            Manage Stores
          </Button>
        </Link>
      </div>

      <div>
        <h3>Customers</h3>
        <Link to="/customers">
          <Button variant="contained" color="secondary">
            Manage Customers
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
