import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Customer {
    id: number;
    vatNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        axios
            .get<Customer[]>('http://localhost:8080/api/customers', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setCustomers(response.data))
            .catch((error) => {
                console.error('Error fetching customers', error);
                navigate('/');
            });
    }, [navigate]);

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Customers</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>vatNumber</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.vatNumber}</TableCell>
                                <TableCell>{customer.firstName}</TableCell>
                                <TableCell>{customer.lastName}</TableCell>
                                <TableCell>{customer.dateOfBirth}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default Customers;
