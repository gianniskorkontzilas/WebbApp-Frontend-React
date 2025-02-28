// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { TextField, Button, Box, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
// import axiosInstance from "../api/axiosInstance.ts";

// interface StoreData {
//   name: string;
// }

// const StoreForm: React.FC = () => {
//   const [name, setName] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const { storeId } = useParams<{ storeId?: string }>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (storeId) {
//       const fetchStore = async () => {
//         try {
//           const response = await axiosInstance.get(`/stores/${storeId}`);
//           setName(response.data.name);
//         } catch (error) {
//           console.error("Error fetching store:", error);
//           setError("Σφάλμα κατά την φόρτωση των δεδομένων του καταστήματος.");
//         }
//       };
//       fetchStore();
//     }
//   }, [storeId]);

//   const handleSubmit = async () => {
//     if (!name) {
//       setError("Το όνομα του καταστήματος είναι υποχρεωτικό.");
//       return;
//     }

//     const storeData: StoreData = { name };
//     setIsLoading(true);

//     try {
//       if (storeId) {
//         await axiosInstance.put(`/stores/${storeId}`, storeData);
//       } else {
//         await axiosInstance.post("/stores", storeData);
//       }
//       navigate("/stores");
//     } catch (err: any) {
//       if (err.response?.status === 400) {
//         setError("Το όνομα του store πρέπει να είναι μοναδικό.");
//       } else {
//         setError("Σφάλμα κατά την αποθήκευση του καταστήματος.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width: "100%", maxWidth: 600 }}>
//       <Typography variant="h5" align="center" sx={{ mb: 3 }}>
//         {storeId ? "Edit Store" : "Add Store"}
//       </Typography>
      
//       <TextField
//         label="Store Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         margin="normal"
//         fullWidth
//         sx={{ mb: 2 }}
//       />
      
//       {error && (
//         <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
//           <Alert onClose={() => setError("")} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         sx={{ marginTop: 2, minWidth: 200 }}
//         disabled={isLoading}
//       >
//         {isLoading ? <CircularProgress size={24} /> : storeId ? "Save Changes" : "Add Store"}
//       </Button>
//     </Box>
//   );
// };

// export default StoreForm;



import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useError } from "../context/ErrorContext.tsx";  
import axiosInstance from "../api/axiosInstance.ts";

interface StoreData {
  name: string;
}

const StoreForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { storeId } = useParams<{ storeId?: string }>();
  const navigate = useNavigate();
  
  const { showError } = useError();  

  useEffect(() => {
    if (storeId) {
      const fetchStore = async () => {
        try {
          const response = await axiosInstance.get(`/stores/${storeId}`);
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching store:", error);
          showError("Error loading store data.", "error");  
        }
      };
      fetchStore();
    }
  }, [storeId, showError]);

  const handleSubmit = async () => {
    if (!name) {
      showError("Store name is required.", "error");  
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
        showError("Store name must be unique.", "error");  
      } else {
        showError("Error saving store.", "error");  
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width: "100%", maxWidth: 600 }}>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        {storeId ? "Edit Store" : "Add Store"}
      </Typography>
      
      <TextField
        label="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2, minWidth: 200 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : storeId ? "Save Changes" : "Add Store"}
      </Button>
    </Box>
  );
};

export default StoreForm;