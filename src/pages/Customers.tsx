import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton, Snackbar, Alert, CircularProgress, Box, Typography, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false); 
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null); 
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
      showSnackbar("Failed to delete customer.", "error");
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

  const handleOpenDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true); 
  };

  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedCustomer(null);
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
                    onClick={() => handleOpenDetails(customer)} 
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

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/customers/new"
        sx={{ marginTop: 2, marginRight: 2 }}
      >
        Add Customer
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/customers/search")}
      >
        Search
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={open} onClose={handleCloseDetails}>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedCustomer ? (
            <>
              <Typography variant="h6">Customer ID: {selectedCustomer.id}</Typography>
              <Typography variant="h6">First Name: {selectedCustomer.firstName}</Typography>
              <Typography variant="h6">Last Name: {selectedCustomer.lastName}</Typography>
              <Typography variant="body2">VAT Number: {selectedCustomer.vatNumber}</Typography>
              <Typography variant="body2">Date of Birth: {selectedCustomer.dateOfBirth}</Typography>
            </>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Customers;
