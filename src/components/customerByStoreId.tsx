// import React, { useState } from "react";
// import { Button, CircularProgress, Typography, Card, CardContent, CardActions, Box, TextField, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { useNavigate } from 'react-router-dom'; 
// import axiosInstance from "../api/axiosInstance.ts";

// interface Customer {
//   id: number;
//   vatNumber: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
// }

// const CustomerByStoreId: React.FC = () => {
//   const navigate = useNavigate(); 
//   const [storeId, setStoreId] = useState<string>('');
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

//   const [open, setOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

//   const handleSearch = async () => {
//     if (!storeId) {
//       showSnackbar("Please enter a Store ID.", "error");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axiosInstance.get<Customer[]>(`/customers/store/${storeId}`);

//       if (response.data && response.data.length > 0) {
//         setCustomers(response.data); 
//         showSnackbar("Customers found successfully!", "success");
//       } else {
//         setCustomers([]);
//         showSnackbar("No customers found for this Store ID.", "error");
//       }
//     } catch (error) {
//       showSnackbar("Error fetching customer data.", "error");
//       setCustomers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSnackbar = (message: string, severity: "success" | "error") => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleOpen = (customer: Customer) => {
//     setSelectedCustomer(customer);
//     setOpen(true); 
//   };

//   const handleClose = () => {
//     setOpen(false); 
//     setSelectedCustomer(null); 
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Search Customers by Store ID
//       </Typography>

//       <TextField
//         label="Enter Store ID"
//         value={storeId}
//         onChange={(e) => setStoreId(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
      
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSearch}
//         disabled={loading}
//       >
//         Search
//       </Button>

//       {loading && <CircularProgress sx={{ marginTop: 2 }} />}

//       <Box display="flex" flexWrap="wrap" gap={2} marginTop={2}>
//         {customers.length > 0 ? (
//           customers.map((customer) => (
//             <Card key={customer.id}>
//               <CardContent>
//                 <Typography variant="h6">{customer.firstName} {customer.lastName}</Typography>
//                 <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary" onClick={() => handleOpen(customer)}>
//                   View Details
//                 </Button>
//               </CardActions>
//             </Card>
//           ))
//         ) : (
//           <></>
//         )}
//       </Box>

//       <Button
//         variant="contained"
//         color="secondary"
//         sx={{ marginTop: 2 }}
//         onClick={() => navigate('/customers')} 
//       >
//         Back to Customers
//       </Button>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Customer Details</DialogTitle>
//         <DialogContent>
//           {selectedCustomer ? (
//             <>
//               <Typography variant="h6">Customer ID: {selectedCustomer.id}</Typography>
//               <Typography variant="h6">First Name: {selectedCustomer.firstName}</Typography>
//               <Typography variant="h6">Last Name: {selectedCustomer.lastName}</Typography>
//               <Typography variant="body2">VAT Number: {selectedCustomer.vatNumber}</Typography>
//               <Typography variant="body2">Date of Birth: {selectedCustomer.dateOfBirth}</Typography>
//             </>
//           ) : (
//             <CircularProgress />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CustomerByStoreId;

import React, { useState } from "react";
import { Button, CircularProgress, Typography, Card, CardContent, CardActions, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from "../api/axiosInstance.ts";
import { useError } from "../context/ErrorContext.tsx";  

interface Customer {
  id: number;
  vatNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const CustomerByStoreId: React.FC = () => {
  const navigate = useNavigate(); 
  const [storeId, setStoreId] = useState<string>('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const { showError, showSuccess } = useError();  
  const handleSearch = async () => {
    if (!storeId) {
      showError("Please enter a Store ID.", "error"); 
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get<Customer[]>(`/customers/store/${storeId}`);

      if (response.data && response.data.length > 0) {
        setCustomers(response.data); 
        showSuccess("Customers found successfully!");  
      } else {
        setCustomers([]);
        showError("No customers found for this Store ID.", "error"); 
      }
    } catch (error) {
      showError("Error fetching customer data.", "error"); 
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
    setSelectedCustomer(null); 
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search Customers by Store ID
      </Typography>

      <TextField
        label="Enter Store ID"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
      >
        Search
      </Button>

      {loading && <CircularProgress sx={{ marginTop: 2 }} />}

      <Box display="flex" flexWrap="wrap" gap={2} marginTop={2}>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <Card key={customer.id}>
              <CardContent>
                <Typography variant="h6">{customer.firstName} {customer.lastName}</Typography>
                <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleOpen(customer)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <></>
        )}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={() => navigate('/customers')} 
      >
        Back to Customers
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedCustomer ? (
            <>
              <Typography variant="h6">Customer ID: {selectedCustomer.id}</Typography>
              <Typography variant="h6">First Name: {selectedCustomer.firstName}</Typography>
              <Typography variant="h6">Last Name: {selectedCustomer.lastName}</Typography>
              <Typography variant="body2">VAT Number: {selectedCustomer.vatNumber}</Typography>
              <Typography variant="body2">Date of Birth: {selectedCustomer.dateOfBirth}</Typography>
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

export default CustomerByStoreId;
