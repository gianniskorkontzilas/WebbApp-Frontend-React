import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    vatNumber: string;
    email: string;
    dateOfBirth: string;
}

const CustomerDetails: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axiosInstance.get<Customer[]>("/customers");
                console.log(response.data); 
                setCustomers(response.data); 
            } catch (error) {
                console.error(error); 
                setError("Failed to fetch customer details.");
            }
        };
        fetchCustomerDetails();
    }, []);

    return (
        <div>
            {customers.length > 0 ? (
                customers.map((customer) => (
                    <div key={customer.id}>
                        <h2>{customer.firstName || "Not Available"} {customer.lastName || "Not Available"}</h2>
                        <p>ΑΦΜ: {customer.vatNumber || "Not Available"}</p>
                        <p>Ημερομηνία Γέννησης: {
                            new Date(customer.dateOfBirth).toLocaleDateString() !== "Invalid Date" 
                            ? new Date(customer.dateOfBirth).toLocaleDateString() 
                            : "Invalid Date"
                        }</p>
                    </div>
                ))
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
