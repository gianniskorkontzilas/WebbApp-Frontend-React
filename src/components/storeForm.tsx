import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";

interface StoreData {
  name: string;
}

const StoreForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { storeId } = useParams<{ storeId?: string }>();  
  const navigate = useNavigate();

  useEffect(() => {
    if (storeId) {
      const fetchStore = async () => {
        try {
          const response = await axiosInstance.get(`/stores/${storeId}`);
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching store:", error);
          setError("Σφάλμα κατά την φόρτωση των δεδομένων του καταστήματος.");
        }
      };
      fetchStore();
    }
  }, [storeId]);

  const handleSubmit = async () => {
    if (!name) {
      setError("Το όνομα του καταστήματος είναι υποχρεωτικό.");
      return;
    }

    const storeData: StoreData = { name };
    setIsLoading(true);

    try {
      if (storeId) {
        await axiosInstance.put(`/stores/${storeId}`, storeData);
      } else {
        await axiosInstance.post("/stores", storeData);
      }
      navigate("/stores");  
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Το όνομα του store πρέπει να είναι μοναδικό.");
      } else {
        setError("Σφάλμα κατά την αποθήκευση του καταστήματος.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4">{storeId ? "Edit Store" : "Add Store"}</Typography>
      
      <TextField
        label="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
      />
      
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
          <Alert onClose={() => setError("")} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
        disabled={isLoading}  
      >
        {isLoading ? <CircularProgress size={24} /> : storeId ? "Save Changes" : "Add Store"}
      </Button>
    </Box>
  );
};

export default StoreForm;

