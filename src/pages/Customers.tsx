// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button, TextField, Snackbar, Alert, CircularProgress, Box, Typography, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
// import { Delete } from "@mui/icons-material";
// import axiosInstance from "../api/axiosInstance.ts";

// interface Customer {
//   id: number;
//   vatNumber: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
// }

// const Customers: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [open, setOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//   const [searchId, setSearchId] = useState<string>("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axiosInstance.get<Customer[]>("/customers");
//         setCustomers(response.data);
//       } catch (error) {
//         setError("Error fetching customers.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const handleDelete = async (customerId: number) => {
//     try {
//       await axiosInstance.delete(`/customers/${customerId}`);
//       setCustomers(customers.filter(customer => customer.id !== customerId));
//       showSnackbar("Customer deleted successfully.", "success");
//     } catch (error) {
//       showSnackbar("Failed to delete customer.", "error");
//     }
//   };

//   const showSnackbar = (message: string, severity: "success" | "error") => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   const handleOpenDetails = (customer: Customer) => {
//     setSelectedCustomer(customer);
//     setOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setOpen(false);
//     setSelectedCustomer(null);
//   };

//   const handleSearchById = () => {
//     if (!searchId) {
//       showSnackbar("Please enter a customer ID.", "error");
//       return;
//     }

//     const isCustomersPage = location.pathname.includes("customers");
//     const path = isCustomersPage ? "customers" : "stores";
//     navigate(`/${path}/${searchId}`);
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom color="primary">
//         Customers
//       </Typography>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Snackbar open={!!error} autoHideDuration={6000}>
//           <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
//         </Snackbar>
//       ) : (
//         <Box display="flex" flexWrap="wrap" gap={2}>
//           {customers.map((customer) => (
//             <Box key={customer.id} width={{ xs: "100%", sm: "48%", md: "32%" }} sx={{ ':hover': { boxShadow: 6 } }}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{customer.firstName} {customer.lastName}</Typography>
//                   <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" color="primary" onClick={() => handleOpenDetails(customer)}>
//                     View Details
//                   </Button>
//                   <Link to={`/customers/${customer.id}/edit`} style={{ textDecoration: 'none' }}>
//                     <Button size="small" color="secondary">
//                       Edit
//                     </Button>
//                   </Link>
//                   <IconButton onClick={() => handleDelete(customer.id)} color="secondary">
//                     <Delete />
//                   </IconButton>
//                 </CardActions>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       )}

//       <Button variant="contained" color="primary" component={Link} to="/customers/new" sx={{ marginTop: 2, marginRight: 2 }}>
//         Add Customer
//       </Button>

//       <Box display="flex" justifyContent="space-between" marginTop={2}>
//         <Box display="flex" gap={2}>
//           <TextField
//             label="Search by Customer ID"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             variant="outlined"
//             sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px" }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSearchById}
//             sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px", padding: "10px 20px" }}
//           >
//             Search by ID
//           </Button>
//         </Box>

//         <Box display="flex" gap={2}>
//           <Button variant="contained" color="secondary" onClick={() => navigate("/customers/searchByVat")} sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px", padding: "10px 20px" }}>
//             Search by VAT Number
//           </Button>

//           <Button variant="contained" color="primary" onClick={() => navigate("/customers/searchByStoreId")} sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px", padding: "10px 20px" }}>
//             Search by Store ID
//           </Button>
//         </Box>
//       </Box>

//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog open={open} onClose={handleCloseDetails}>
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
//           <Button onClick={handleCloseDetails} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Customers;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, CircularProgress, Box, Typography, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useError } from "../context/ErrorContext.tsx"; 
import axiosInstance from "../api/axiosInstance.ts";

interface Customer {
  id: number;
  vatNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchId, setSearchId] = useState<string>("");

  const { showError } = useError();  

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get<Customer[]>("/customers");
        setCustomers(response.data);
      } catch (error) {
        showError("Error fetching customers.", "error");  
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [showError]);

  const handleDelete = async (customerId: number) => {
    try {
      await axiosInstance.delete(`/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer.id !== customerId));
      showError("Customer deleted successfully.", "success");  
    } catch (error) {
      showError("Failed to delete customer.", "error");  
    }
  };

  const handleOpenDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleSearchById = () => {
    if (!searchId) {
      showError("Please enter a customer ID.", "error");  
      return;
    }

    const isCustomersPage = location.pathname.includes("customers");
    const path = isCustomersPage ? "customers" : "stores";
    navigate(`/${path}/${searchId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom color="primary">
        Customers
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {customers.map((customer) => (
            <Box key={customer.id} width={{ xs: "100%", sm: "48%", md: "32%" }} sx={{ ':hover': { boxShadow: 6 } }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{customer.firstName} {customer.lastName}</Typography>
                  <Typography variant="body2">VAT: {customer.vatNumber}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleOpenDetails(customer)}>
                    View Details
                  </Button>
                  <Link to={`/customers/${customer.id}/edit`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="secondary">
                      Edit
                    </Button>
                  </Link>
                  <IconButton onClick={() => handleDelete(customer.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Button variant="contained" color="primary" component={Link} to="/customers/new" sx={{ marginTop: 2, marginRight: 2 }}>
        Add Customer
      </Button>

      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Box display="flex" gap={2}>
          <TextField
            label="Search by Customer ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            variant="outlined"
            sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchById}
            sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px", padding: "10px 20px" }}
          >
            Search by ID
          </Button>
        </Box>

        <Box display="flex" gap={2}>
          <Button variant="contained" color="secondary" onClick={() => navigate("/customers/searchByVat")} sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px", padding: "10px 20px" }}>
            Search by VAT Number
          </Button>

          <Button variant="contained" color="primary" onClick={() => navigate("/customers/searchByStoreId")} sx={{ maxWidth: "200px", width: "auto", borderRadius: "8px", padding: "10px 20px" }}>
            Search by Store ID
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleCloseDetails}>
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
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Customers;
