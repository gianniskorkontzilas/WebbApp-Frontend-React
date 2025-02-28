// import React, { useState, useEffect } from "react";
// import { CircularProgress, Typography, Box, Container } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance.ts";
// import { useError } from "../context/ErrorContext.tsx";  

// interface Customer {
//   id: number;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   vatNumber: string;
// }

// const CustomerDetails: React.FC = () => {
//   const { customerId } = useParams<{ customerId: string }>(); 
//   const [customer, setCustomer] = useState<Customer | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const { showError } = useError();  

//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       if (customerId) {
//         try {
//           const response = await axiosInstance.get<Customer>(`/customers/${customerId}`);
//           setCustomer(response.data);
//         } catch (error) {
//           showError("Failed to fetch customer details.", "error"); 
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchCustomerDetails();
//   }, [customerId, showError]);

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4, width: "100%", paddingX: 2 }}>
//       {isLoading ? (
//         <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </Box>
//       ) : customer ? (
//         <Box sx={{ boxShadow: 2, borderRadius: 2, p: 3 }}>
//           <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
//             {customer.firstName} {customer.lastName}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Customer ID: {customer.id}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             VAT Number: {customer.vatNumber}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Date of Birth: {customer.dateOfBirth}
//           </Typography>
//         </Box>
//       ) : (
//         <Box>
//           <Typography variant="body1" color="textSecondary">
//             No customer found.
//           </Typography>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default CustomerDetails;


import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Box, Container, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";  
import axiosInstance from "../api/axiosInstance.ts";
import { useError } from "../context/ErrorContext.tsx";  

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  vatNumber: string;
}

const CustomerDetails: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>(); 
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showError } = useError();  

  const navigate = useNavigate();  
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (customerId) {
        try {
          const response = await axiosInstance.get<Customer>(`/customers/${customerId}`);
          setCustomer(response.data);
        } catch (error) {
          showError("Failed to fetch customer details.", "error"); 
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCustomerDetails();
  }, [customerId, showError]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, width: "100%", paddingX: 2 }}>
      {isLoading ? (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : customer ? (
        <Box sx={{ boxShadow: 2, borderRadius: 2, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            {customer.firstName} {customer.lastName}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Customer ID: {customer.id}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            VAT Number: {customer.vatNumber}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Date of Birth: {customer.dateOfBirth}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" color="textSecondary">
            No customer found.
          </Typography>
        </Box>
      )}

      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/customers')} 
        >
          Back to Customers
        </Button>
      </Box>
    </Container>
  );
};

export default CustomerDetails;
