import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Stores from './pages/Stores';
import Customers from './pages/Customers';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/customers" element={<Customers />} />
        </Routes>
    );
};

export default App;
