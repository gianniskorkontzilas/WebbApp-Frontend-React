// import React, { createContext, useContext, useState, ReactNode } from "react";
// import Snackbar from "@mui/material/Snackbar";  

// interface ErrorContextType {
//   showError: (msg: string) => void;
// }

// const ErrorContext = createContext<ErrorContextType | null>(null);

// export const useError = (): ErrorContextType => {
//   const context = useContext(ErrorContext);
//   if (!context) {
//     throw new Error("useError must be used within an ErrorProvider");
//   }
//   return context;
// };

// interface ErrorProviderProps {
//   children: ReactNode;
// }

// export const ErrorProvider = ({ children }: ErrorProviderProps) => {
//   const [error, setError] = useState<string>("");

//   const showError = (msg: string) => {
//     setError(msg);  
//   };

//   const handleClose = () => {
//     setError("");  
//   };

//   return (
//     <ErrorContext.Provider value={{ showError }}>
//       {children}
//       <Snackbar
//         open={!!error}
//         message={error}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       />
//     </ErrorContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState, ReactNode } from "react";
// import CustomSnackBar from "../components/CustomSnackBar.tsx";  

// interface ErrorContextType {
//   showError: (msg: string, severity: "success" | "error" | "info" | "warning") => void;
// }

// const ErrorContext = createContext<ErrorContextType | null>(null);

// export const useError = (): ErrorContextType => {
//   const context = useContext(ErrorContext);
//   if (!context) {
//     throw new Error("useError must be used within an ErrorProvider");
//   }
//   return context;
// };

// interface ErrorProviderProps {
//   children: ReactNode;
// }

// export const ErrorProvider = ({ children }: ErrorProviderProps) => {
//   const [error, setError] = useState<string>("");
//   const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">("success");

//   const showError = (msg: string, severity: "success" | "error" | "info" | "warning") => {
//     setError(msg);
//     setSeverity(severity);
//   };

//   const handleClose = () => {
//     setError("");  
//   };

//   return (
//     <ErrorContext.Provider value={{ showError }}>
//       {children}
//       <CustomSnackBar open={!!error} message={error} severity={severity} onClose={handleClose} />
//     </ErrorContext.Provider>
//   );
// };


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
