import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import axios from "../api/axiosInstance.ts";

const CustomerForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [vatNumber, setVatNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(""); 
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const { storeId, customerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (customerId) {
            const fetchCustomer = async () => {
                try {
                    const response = await axios.get(`/stores/${storeId}/customers/${customerId}`);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setVatNumber(response.data.vatNumber);
                    setDateOfBirth(response.data.dateOfBirth); 
                } catch (error) {
                    console.error("Error fetching customer:", error);
                    showSnackbar("Failed to fetch customer details.", "error");
                }
            };
            fetchCustomer();
        }
    }, [storeId, customerId]);

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async () => {
        const customerData = { firstName, lastName, vatNumber, dateOfBirth }; 
        try {
            if (customerId) {
                await axios.put(`/stores/${storeId}/customers/${customerId}`, customerData);
                showSnackbar("Customer updated successfully.", "success");
            } else {
                await axios.post(`/stores/${storeId}/customers`, customerData);
                showSnackbar("Customer created successfully.", "success");
            }
            navigate(`/stores/${storeId}/customers`);
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
