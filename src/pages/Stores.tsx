import React, { useState, useEffect } from "react";
import { Button, IconButton, Snackbar, Alert, CircularProgress, Box, Typography, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axiosInstance from "../api/axiosInstance.ts";

interface Store {
  id: string;
  name: string;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [open, setOpen] = useState(false);  
  const [selectedStore, setSelectedStore] = useState<Store | null>(null); 

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get<Store[]>("/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        setError("Error fetching stores");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleDelete = async (storeId: string) => {
    try {
      await axiosInstance.delete(`/stores/${storeId}`);
      setStores(stores.filter(store => store.id !== storeId));
      showSnackbar("Store deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting store:", error);
      showSnackbar("Failed to delete store.", "error");
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleOpen = (store: Store) => {
    setSelectedStore(store); 
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
    setSelectedStore(null); 
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Stores
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
        </Snackbar>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {stores.map((store) => (
            <Box key={store.id} width={{ xs: "100%", sm: "48%", md: "32%" }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{store.name}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleOpen(store)} 
                  >
                    View Details
                  </Button>
                  <IconButton onClick={() => handleDelete(store.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Button variant="contained" color="primary" component="a" href="/stores/new" sx={{ marginTop: 2 }}>
        Add Store
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Store Details</DialogTitle>
        <DialogContent>
          {selectedStore ? (
            <>
              <Typography variant="h6">Store Name: {selectedStore.name}</Typography>
              <Typography variant="body2">Store ID: {selectedStore.id}</Typography> 
            </>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Stores;
