// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
// import axiosInstance from "../api/axiosInstance.ts";
// import { useError } from "../context/ErrorContext.tsx";  

// const CustomerForm = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [vatNumber, setVatNumber] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [storeId, setStoreId] = useState<number | null>(null); 
//     const [isLoading, setIsLoading] = useState(false); 

//     const { storeId: storeIdParam, customerId } = useParams();
//     const navigate = useNavigate();

//     const { showError } = useError();  

//     useEffect(() => {
//         if (storeIdParam) {
//             setStoreId(Number(storeIdParam));
//         }

//         if (customerId) {
//             const fetchCustomer = async () => {
//                 try {
//                     const response = await axiosInstance.get(`/customers/${customerId}`);
//                     setFirstName(response.data.firstName);
//                     setLastName(response.data.lastName);
//                     setVatNumber(response.data.vatNumber);
//                     setDateOfBirth(response.data.dateOfBirth);
//                     setStoreId(response.data.storeId); 
//                 } catch (error) {
//                     console.error("Error fetching customer:", error);
//                     showError("Failed to fetch customer details.", "error");
//                 }
//             };
//             fetchCustomer();
//         }
//     }, [storeIdParam, customerId, showError]);

//     const handleSubmit = async () => {
//         if (!storeId) {
//             showError("Store ID is required.", "error");
//             return;
//         }

//         const customerData = { firstName, lastName, vatNumber, dateOfBirth, storeId };
//         setIsLoading(true); 

//         try {
//             if (customerId) {
//                 await axiosInstance.put(`/customers/${customerId}`, customerData);
//                 showError("Customer updated successfully.", "success");
//             } else {
//                 await axiosInstance.post(`/customers`, customerData);
//                 showError("Customer created successfully.", "success");
//             }
//             navigate(`/customers`);
//         } catch (error) {
//             console.error("Error saving customer:", error);
//             showError("Failed to save customer.", "error");
//         } finally {
//             setIsLoading(false); 
//         }
//     };

//     return (
//         <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width: '100%', maxWidth: 500 }}>
//             <Typography variant="h4" sx={{ mb: 3 }}>
//                 {customerId ? "Edit Customer" : "Add Customer"}
//             </Typography>
//             <TextField
//                 label="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 margin="normal"
//                 fullWidth
//             />
//             <TextField
//                 label="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 margin="normal"
//                 fullWidth
//             />
//             <TextField
//                 label="VAT Number"
//                 value={vatNumber}
//                 onChange={(e) => setVatNumber(e.target.value)}
//                 margin="normal"
//                 fullWidth
//             />
//             <TextField
//                 label="Date of Birth"
//                 type="date"
//                 value={dateOfBirth}
//                 onChange={(e) => setDateOfBirth(e.target.value)}
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//             />
//             <TextField
//                 label="Store ID"
//                 type="number"
//                 value={storeId || ""}
//                 onChange={(e) => setStoreId(Number(e.target.value))}
//                 margin="normal"
//                 fullWidth
//             />
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 sx={{ mt: 2 }}
//                 disabled={isLoading}  
//             >
//                 {isLoading ? <CircularProgress size={24} /> : customerId ? "Save Changes" : "Add Customer"}
//             </Button>
//         </Box>
//     );
// };

// export default CustomerForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";
import { useError } from "../context/ErrorContext.tsx";  

const CustomerForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [vatNumber, setVatNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [storeId, setStoreId] = useState<number | null>(null); 
    const [isLoading, setIsLoading] = useState(false); 

    const { storeId: storeIdParam, customerId } = useParams();
    const navigate = useNavigate();

    const { showError, showSuccess } = useError();  

    useEffect(() => {
        if (storeIdParam) {
            setStoreId(Number(storeIdParam));
        }

        if (customerId) {
            const fetchCustomer = async () => {
                try {
                    const response = await axiosInstance.get(`/customers/${customerId}`);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setVatNumber(response.data.vatNumber);
                    setDateOfBirth(response.data.dateOfBirth);
                    setStoreId(response.data.storeId); 
                } catch (error) {
                    console.error("Error fetching customer:", error);
                    showError("Failed to fetch customer details.", "error");
                }
            };
            fetchCustomer();
        }
    }, [storeIdParam, customerId, showError]);

    const handleSubmit = async () => {
        if (!storeId) {
            showError("Store ID is required.", "error");
            return;
        }

        const customerData = { firstName, lastName, vatNumber, dateOfBirth, storeId };
        setIsLoading(true); 

        try {
            if (customerId) {
                await axiosInstance.put(`/customers/${customerId}`, customerData);
                showSuccess("Customer updated successfully.");
            } else {
                await axiosInstance.post(`/customers`, customerData);
                showSuccess("Customer created successfully.");
            }
            
            setTimeout(() => navigate(`/customers`), 2000); 
        } catch (error) {
            console.error("Error saving customer:", error);
            showError("Failed to save customer.", "error");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {customerId ? "Edit Customer" : "Add Customer"}
            </Typography>
            <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="VAT Number"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                margin="normal"
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
            />
            <TextField
                label="Store ID"
                type="number"
                value={storeId || ""}
                onChange={(e) => setStoreId(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
                disabled={isLoading}  
            >
                {isLoading ? <CircularProgress size={24} /> : customerId ? "Save Changes" : "Add Customer"}
            </Button>
        </Box>
    );
};

export default CustomerForm;
