import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    taxId: string;
    email: string;
    dateOfBirth: string; 
}

const CustomerDetails: React.FC = () => {
    const [customer, setCustomer] = useState<Customer | null>(null); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axiosInstance.get<Customer>("/customers/1"); 
                setCustomer(response.data);
            } catch (error) {
                setError("Failed to fetch customer details.");
            }
        };
        fetchCustomerDetails();
    }, []);

    return (
        <div>
            {customer ? (
                <div>
                    <h2>{customer.firstName} {customer.lastName}</h2>
                    <p>ΑΦΜ: {customer.taxId}</p>
                    <p>Email: {customer.email}</p>
                    <p>Ημερομηνία Γέννησης: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
                  
                </div>
            ) : (
                <div>Loading...</div>
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

export default CustomerDetails;
