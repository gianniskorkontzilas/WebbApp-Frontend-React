import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";  

interface ErrorContextType {
  showError: (msg: string) => void;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<string>("");

  const showError = (msg: string) => {
    setError(msg);  
  };

  const handleClose = () => {
    setError("");  
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <Snackbar
        open={!!error}
        message={error}
        autoHideDuration={6000}
        onClose={handleClose}
      />
    </ErrorContext.Provider>
  );
};
