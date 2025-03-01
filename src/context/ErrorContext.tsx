import React, { createContext, useContext, useState, ReactNode } from "react";
import CustomSnackBar from "../components/CustomSnackBar.tsx";  

interface ErrorContextType {
  showError: (msg: string, severity: "success" | "error" | "info" | "warning") => void;
  showSuccess: (msg: string) => void;  
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
  const [message, setMessage] = useState<string>("");  
  const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">("success");

  const showError = (msg: string, severity: "success" | "error" | "info" | "warning") => {
    setMessage(msg);
    setSeverity(severity);
  };

  const showSuccess = (msg: string) => {
    setMessage(msg);  
    setSeverity("success");  
  };

  const handleClose = () => {
    setMessage("");  
  };

  return (
    <ErrorContext.Provider value={{ showError, showSuccess }}>
      {children}
      <CustomSnackBar open={!!message} message={message} severity={severity} onClose={handleClose} />
    </ErrorContext.Provider>
  );
};


