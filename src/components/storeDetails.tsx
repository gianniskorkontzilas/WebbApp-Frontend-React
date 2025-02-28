// import React, { useState, useEffect } from "react";
// import { CircularProgress, Typography, Box, Container } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useError } from "../context/ErrorContext.tsx";  
// import axiosInstance from "../api/axiosInstance.ts";

// interface Store {
//   id: number;
//   name: string;
// }

// const StoreDetails: React.FC = () => {
//   const { storeId } = useParams<{ storeId: string }>(); 
//   const [store, setStore] = useState<Store | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const { showError } = useError();  

//   useEffect(() => {
//     const fetchStoreDetails = async () => {
//       if (storeId) {
//         try {
//           const response = await axiosInstance.get<Store>(`/stores/${storeId}`);
//           setStore(response.data);
//         } catch (error) {
//           showError("Error loading store data.", "error");  
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchStoreDetails();
//   }, [storeId, showError]);

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4, width: "100%", paddingX: 2 }}>
//       {isLoading ? (
//         <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </Box>
//       ) : store ? (
//         <Box sx={{ boxShadow: 2, borderRadius: 2, p: 3 }}>
//           <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
//             {store.name}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Store ID: {store.id}
//           </Typography>
//         </Box>
//       ) : (
//         <Box>
//           <Typography variant="body1" color="textSecondary">
//             No store found.
//           </Typography>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default StoreDetails;


import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Box, Container, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; 
import { useError } from "../context/ErrorContext.tsx";  
import axiosInstance from "../api/axiosInstance.ts";

interface Store {
  id: number;
  name: string;
}

const StoreDetails: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>(); 
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { showError } = useError();  
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (storeId) {
        try {
          const response = await axiosInstance.get<Store>(`/stores/${storeId}`);
          setStore(response.data);
        } catch (error) {
          showError("Error loading store data.", "error");  
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStoreDetails();
  }, [storeId, showError]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, width: "100%", paddingX: 2 }}>
      {isLoading ? (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : store ? (
        <Box sx={{ boxShadow: 2, borderRadius: 2, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            {store.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Store ID: {store.id}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" color="textSecondary">
            No store found.
          </Typography>
        </Box>
      )}

    
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/stores')} 
        >
          Back to Stores
        </Button>
      </Box>
    </Container>
  );
};

export default StoreDetails;
