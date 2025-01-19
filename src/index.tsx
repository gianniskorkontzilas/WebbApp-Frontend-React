import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/authContext.tsx"; 
import { ErrorProvider } from "./context/ErrorContext.tsx"; 
import AppRouter from "./App.tsx"; 

const App = () => {
  return (
    <AuthProvider> 
      <ErrorProvider>
        <AppRouter />
      </ErrorProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
