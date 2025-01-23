import React, { useState, useEffect } from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.ts";

interface Store {
  id: number;
  name: string;
}

const StoreDetails: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>(); 
  const [store, setStore] = useState<Store | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (storeId) {
        try {
          const response = await axiosInstance.get<Store>(`/stores/${storeId}`);
          setStore(response.data);
        } catch (error) {
          setError("Failed to fetch store details.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStoreDetails();
  }, [storeId]);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : store ? (
        <div>
          <h1>{store.name}</h1>
          
        </div>
      ) : (
        <div>No store found.</div>
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

export default StoreDetails;

