import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";

const CustomerForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [vatNumber, setVatNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [storeId, setStoreId] = useState<number | null>(null); 
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const { storeId: storeIdParam, customerId } = useParams();
    const navigate = useNavigate();

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
                    showSnackbar("Failed to fetch customer details.", "error");
                }
            };
            fetchCustomer();
        }
    }, [storeIdParam, customerId]);

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async () => {
        if (!storeId) {
            showSnackbar("Store ID is required.", "error");
            return;
        }

        const customerData = { firstName, lastName, vatNumber, dateOfBirth, storeId };

        console.log("Sending data:", customerData); 

        try {
            if (customerId) {
                await axiosInstance.put(`/customers/${customerId}`, customerData);
                showSnackbar("Customer updated successfully.", "success");
            } else {
                await axiosInstance.post(`/customers`, customerData);
                showSnackbar("Customer created successfully.", "success");
            }
            navigate(`/customers`);
        } catch (error) {
            console.error("Error saving customer:", error);
            showSnackbar("Failed to save customer.", "error");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Typography variant="h4">{customerId ? "Edit Customer" : "Add Customer"}</Typography>
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
                InputLabelProps={{
                    shrink: true,
                }}
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
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                {customerId ? "Save Changes" : "Add Customer"}
            </Button>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity as "success" | "error"} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomerForm;
