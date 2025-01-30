import React, { useState, useEffect } from "react";
import { Snackbar, Alert, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.ts";

interface Customer {
  id: number;
  vatNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const CustomerDetails: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>(); 
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (customerId) {
        try {
          const response = await axiosInstance.get<Customer>(`/customers/${customerId}`);
          setCustomer(response.data);
        } catch (error) {
          setError("Failed to fetch customer details.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCustomerDetails();
  }, [customerId]);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : customer ? (
        <div>
          <Typography variant="h4">{customer.firstName} {customer.lastName}</Typography>
          <Typography variant="h6">Customer ID: {customer.id}</Typography>
          <Typography variant="body1">VAT Number: {customer.vatNumber}</Typography>
          <Typography variant="body1">Date of Birth: {customer.dateOfBirth}</Typography>
        </div>
      ) : (
        <div>No customer found.</div>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomerDetails;
