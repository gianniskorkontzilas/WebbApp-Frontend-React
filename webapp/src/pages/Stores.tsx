import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Store {
    id: number;
    name: string;
}

const Stores: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        axios
            .get<Store[]>('http://localhost:8080/api/stores', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setStores(response.data))
            .catch((error) => {
                console.error('Error fetching stores', error);
                navigate('/');
            });
    }, [navigate]);

    const handleViewCustomers = (storeId: number) => {
        navigate(`/customers?storeId=${storeId}`);
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Stores</Typography>
                <List>
                    {stores.map((store) => (
                        <ListItem key={store.id}>
                            <ListItemText primary={store.name} />
                            <Button
                                variant="outlined"
                                onClick={() => handleViewCustomers(store.id)}
                            >
                                View Customers
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default Stores;
