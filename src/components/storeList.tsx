import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { storeService } from "../api/storeService";
import { useNavigate } from "react-router-dom";

interface Store {
  id: string;
  name: string;
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await storeService.getStores();
        setStores(storesData);
      } catch (error) {
        console.error("Error fetching stores", error);
        setError("Error fetching stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

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
                    onClick={() => navigate(`/stores/${store.id}`)}  
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

export default StoreList;
