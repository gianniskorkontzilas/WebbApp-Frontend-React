import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Button, IconButton, Snackbar, Alert } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { storeService } from "../api/storeService"; 

interface Store {
  id: string;
  name: string;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await storeService.getStores();
        setStores(response);
      } catch (error) {
        console.error("Error fetching stores:", error);
        showSnackbar("Failed to fetch stores.", "error");
      }
    };
    fetchStores();
  }, []);

  const handleDelete = async (storeId: string) => {
    try {
      await storeService.deleteStore(storeId);
      setStores(stores.filter((store) => store.id !== storeId));
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <List>
        {stores.map((store) => (
          <ListItem key={store.id}>
            <ListItemText primary={store.name} />
            <IconButton onClick={() => handleDelete(store.id)} color="secondary">
              <Delete />
            </IconButton>
            <Button component={Link} to={`/stores/${store.id}`} variant="outlined" color="primary">
              View
            </Button>
            <Button component={Link} to={`/stores/${store.id}/edit`} variant="contained" color="primary">
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" component={Link} to="/stores/new">
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
    </div>
  );
};

export default Stores;
