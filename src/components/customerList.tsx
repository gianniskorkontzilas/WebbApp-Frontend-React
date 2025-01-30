import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Typography, Card, CardContent, CardActions, Box, TextField, Snackbar, Alert } from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";

interface Customer {
  id: number;
  vatNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const CustomerList: React.FC = () => {
  const navigate = useNavigate();
  const [vatNumber, setVatNumber] = useState<string>('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSearch = async () => {
    if (!vatNumber) {
      showSnackbar("Please enter a VAT number.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get<Customer[]>(`/customers/search?vatNumber=${vatNumber}`);
      
      if (response.data.length > 0) {
        setCustomers(response.data);
        showSnackbar("Customer(s) found successfully!", "success");
      } else {
        setCustomers([]);
        showSnackbar("No customers found with this VAT number.", "error");
      }
      
    } catch (error) {
      showSnackbar("Error fetching customer data.", "error");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search Customers
      </Typography>

      <TextField
        label="Enter VAT Number"
        value={vatNumber}
        onChange={(e) => setVatNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
      >
        Search
      </Button>

      {loading && <CircularProgress sx={{ marginTop: 2 }} />}

      <Box display="flex" flexWrap="wrap" gap={2} marginTop={2}>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <Card key={customer.id}>
              <CardContent>
                <Typography variant="h6">{customer.firstName} {customer.lastName}</Typography>
                <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => navigate(`/customers/${customer.id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          !loading && <Typography>No customers found.</Typography>
        )}
      </Box>

      <Button variant="contained" color="secondary" onClick={() => navigate("/customers")} sx={{ marginTop: 2 }}>
        Back to Customers
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomerList;
