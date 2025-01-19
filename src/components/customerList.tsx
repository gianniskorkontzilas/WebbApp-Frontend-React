import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { customerService } from "../api/customerService";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  vatNumber: string;
  dateOfBirth?: string;
}

const CustomerList: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!storeId) return;
      try {
        const data = await customerService.getCustomers(storeId);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [storeId]);

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
                  <Typography variant="body2">VAT Number: {customer.vatNumber}</Typography>
                  <Typography variant="body2">Date of Birth: {customer.dateOfBirth || "Unknown"}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/customers/${customer.id}`)} 
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default CustomerList;
