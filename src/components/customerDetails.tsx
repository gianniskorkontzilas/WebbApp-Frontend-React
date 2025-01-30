import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, CircularProgress, Typography, Card, CardContent, CardActions,
  TextField, Snackbar, Alert, Container, Grid 
} from "@mui/material";
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
  const [, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSearch = async () => {
    if (!vatNumber) {
      showSnackbar("Please enter a VAT number.", "error");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<Customer[]>(`/customers/search?vatNumber=${vatNumber}`);
      if (response.data.length > 0) {
        setCustomers(response.data);
        showSnackbar("Customer(s) found successfully!", "success");
      } else {
        setCustomers([]);
        showSnackbar("No customers found.", "error");
      }
    } catch (error) {
      setError("Error fetching customer data.");
      setCustomers([]);
      showSnackbar("Failed to fetch data.", "error");
    } finally {
      setLoading(false);
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
    <Container>
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
      
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <Grid item xs={12} sm={6} md={4} key={customer.id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {customer.firstName} {customer.lastName}
                    </Typography>
                    <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => navigate(`/customers/${customer.id}`)}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            !loading && (
              <Typography align="center" sx={{ mt: 2, width: "100%" }}>
                No customers found.
              </Typography>
            )
          )}
        </Grid>
      )}

      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate("/customers")}>
        Back to Customers
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerList;
