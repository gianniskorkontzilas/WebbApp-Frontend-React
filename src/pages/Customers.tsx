import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosInstance from '../api/axiosInstance.ts';

interface Customer {
  id: number;
  vatNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vatNumber, setVatNumber] = useState<string>('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<string | null>(null); 

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get<Customer[]>('/customers');
        setCustomers(response.data);
      } catch (error) {
        setError('Error fetching customers.');
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = async () => {
    if (!vatNumber) {
      setError('Please enter a VAT number.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/customers/search?vatNumber=${vatNumber}`);
      if (response.data) {
        setCustomer(response.data);
        setSuccess('Customer found successfully.');
      } else {
        setCustomer(null);
        setError('No customer found with this VAT number.');
      }
    } catch (error) {
      setError('Error searching for customer.');
      setCustomer(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      <TextField
        label="Search by VAT Number"
        value={vatNumber}
        onChange={(e) => setVatNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {customer ? (
        <div>
          <Typography variant="h6" gutterBottom>
            Customer Found:
          </Typography>
          <p>
            <strong>Name:</strong> {customer.firstName} {customer.lastName}
          </p>
          <p>
            <strong>VAT Number:</strong> {customer.vatNumber}
          </p>
          <p>
            <strong>Date of Birth:</strong> {customer.dateOfBirth}
          </p>
        </div>
      ) : vatNumber && !success && (
        <Typography color="error" gutterBottom>
          No customer found with this VAT number.
        </Typography>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>VAT Number</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.vatNumber}</TableCell>
              <TableCell>{customer.firstName}</TableCell>
              <TableCell>{customer.lastName}</TableCell>
              <TableCell>{customer.dateOfBirth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Customers;
