// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import axiosInstance from '../api/axiosInstance.ts';

// interface Customer {
//   id: number;
//   vatNumber: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
// }

// const Customers: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [vatNumber, setVatNumber] = useState<string>('');
//   const [customer, setCustomer] = useState<Customer | null>(null);
//   const [error, setError] = useState<string | null>(null); 
//   const [success, setSuccess] = useState<string | null>(null); 

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axiosInstance.get<Customer[]>('/customers');
//         setCustomers(response.data);
//       } catch (error) {
//         setError('Error fetching customers.');
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const handleSearch = async () => {
//     if (!vatNumber) {
//       setError('Please enter a VAT number.');
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/customers/search?vatNumber=${vatNumber}`);
//       if (response.data) {
//         setCustomer(response.data);
//         setSuccess('Customer found successfully.');
//       } else {
//         setCustomer(null);
//         setError('No customer found with this VAT number.');
//       }
//     } catch (error) {
//       setError('Error searching for customer.');
//       setCustomer(null);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Customers
//       </Typography>

//       <TextField
//         label="Search by VAT Number"
//         value={vatNumber}
//         onChange={(e) => setVatNumber(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" color="primary" onClick={handleSearch}>
//         Search
//       </Button>

//       {customer ? (
//         <div>
//           <Typography variant="h6" gutterBottom>
//             Customer Found:
//           </Typography>
//           <p>
//             <strong>Name:</strong> {customer.firstName} {customer.lastName}
//           </p>
//           <p>
//             <strong>VAT Number:</strong> {customer.vatNumber}
//           </p>
//           <p>
//             <strong>Date of Birth:</strong> {customer.dateOfBirth}
//           </p>
//         </div>
//       ) : vatNumber && !success && (
//         <Typography color="error" gutterBottom>
//           No customer found with this VAT number.
//         </Typography>
//       )}

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>VAT Number</TableCell>
//             <TableCell>First Name</TableCell>
//             <TableCell>Last Name</TableCell>
//             <TableCell>Date of Birth</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {customers.map((customer) => (
//             <TableRow key={customer.id}>
//               <TableCell>{customer.vatNumber}</TableCell>
//               <TableCell>{customer.firstName}</TableCell>
//               <TableCell>{customer.lastName}</TableCell>
//               <TableCell>{customer.dateOfBirth}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Snackbar
//         open={!!success}
//         autoHideDuration={6000}
//         onClose={() => setSuccess(null)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert severity="success" onClose={() => setSuccess(null)}>
//           {success}
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert severity="error" onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Customers;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton, Snackbar, Alert, CircularProgress, Box, Typography, Card, CardContent, CardActions, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axiosInstance from "../api/axiosInstance.ts";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get<Customer[]>('/customers');
        setCustomers(response.data);
      } catch (error) {
        setError('Error fetching customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId: number) => {
    try {
      await axiosInstance.delete(`/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer.id !== customerId));
      showSnackbar("Customer deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting customer:", error);
      showSnackbar("Failed to delete customer.", "error");
    }
  };

  const handleSearch = async () => {
    if (!vatNumber) {
      setError('Please enter a VAT number.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/customers/search?vatNumber=${vatNumber}`);
      if (response.data) {
        setCustomer(response.data);
        showSnackbar("Customer found successfully.", "success");
      } else {
        setCustomer(null);
        showSnackbar("No customer found with this VAT number.", "error");
      }
    } catch (error) {
      setError('Error searching for customer.');
      setCustomer(null);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
        </Snackbar>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {customers.map((customer) => (
            <Box key={customer.id} width={{ xs: "100%", sm: "48%", md: "32%" }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{customer.firstName} {customer.lastName}</Typography>
                  <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/customers/${customer.id}`)}
                  >
                    View Details
                  </Button>
                  <IconButton onClick={() => handleDelete(customer.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Button variant="contained" color="primary" component={Link} to="/customers/new" sx={{ marginTop: 2 }}>
        Add Customer
      </Button>

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

      {customer && (
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
      )}

      {/* Snackbar for success */}
      <Snackbar
        open={snackbarOpen && snackbarSeverity === "success"}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for error */}
      <Snackbar
        open={snackbarOpen && snackbarSeverity === "error"}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Customers;
