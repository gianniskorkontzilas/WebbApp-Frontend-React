import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.tsx";
import Login from "./pages/Login.tsx";
import Stores from "./pages/Stores.tsx";
import StoreDetails from "./components/storeDetails.tsx";
import StoreForm from "./components/storeForm.tsx";
import Customers from "./pages/Customers.tsx";
import CustomerDetails from "./components/customerDetails.tsx";
import CustomerForm from "./components/customerForm.tsx";
import Dashboard from './pages/Dashboard.tsx';

const AppRouter = () => {
  const { auth } = useAuth(); 

  if (auth === undefined) {
    return <div>Loading...</div>;  
  }

  return (
    <Routes>
      {auth ? (
        <>        
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/stores/:storeId" element={<StoreDetails />} />
          <Route path="/stores/new" element={<StoreForm />} />
          <Route path="/stores/:storeId/edit" element={<StoreForm />} />
          <Route path="/stores/:storeId/customers" element={<Customers />} />
          <Route
            path="/stores/:storeId/customers/:customerId"
            element={<CustomerDetails />}
          />
          <Route path="/stores/:storeId/customers/new" element={<CustomerForm />} />
          <Route
            path="/stores/:storeId/customers/:customerId/edit"
            element={<CustomerForm />}
          />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:customerId" element={<CustomerDetails />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:customerId/edit" element={<CustomerForm />} />
        
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;



