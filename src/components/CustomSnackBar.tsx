// import React from "react";
// import { Snackbar, Alert } from "@mui/material";

// interface SnackBarProps {
//   open: boolean;
//   message: string;
//   severity: "success" | "error" | "info" | "warning";
//   onClose: () => void;
// }

// const SnackBar: React.FC<SnackBarProps> = ({ open, message, severity, onClose }) => (
//   <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
//     <Alert onClose={onClose} severity={severity}>
//       {message}
//     </Alert>
//   </Snackbar>
// );

// export default SnackBar;

import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const SnackBar: React.FC<SnackBarProps> = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}  
  >
    <Alert onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackBar;
