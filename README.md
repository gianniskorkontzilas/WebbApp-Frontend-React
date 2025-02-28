
---

### **Frontend (`README.md`)**
```markdown
# Store Management System - Frontend

## Overview
This repository contains the **frontend** for the Store Management System, which provides a user-friendly interface for managing **stores** and **customers**. The frontend is built using **React.js** with **Material UI** for a modern and responsive design.

## Features
- **User authentication** via JWT tokens
- **CRUD operations** for Stores and Customers
- **React Router** for dynamic page navigation
- **Material UI** components for an elegant UI
- **Error handling** with Snackbars for improved user experience
- **Responsive design** optimized for mobile devices

## Technologies Used
- **React.js**
- **Material UI**
- **React Router**
- **Axios** for API requests
- **Context API** for state management

## Pages
### **Authentication**
- `/login` → Login page for user authentication

### **Stores**
- `/stores` → List of all stores
- `/stores/:storeId` → Store details with a list of associated customers
- `/stores/:storeId/edit` → Edit store information
- `/stores/new` → Create a new store

### **Customers**
- `/customers` → List of all customers
- `/customers/:customerId` → Customer details
- `/customers/:customerId/edit` → Edit customer information
- `/customers/new` → Add a new customer
- `/customers/searchByVat` →  Customer details by vatNumber
- `/customers/searchByStoreId` →  Customer details by StoreId






## API Connection
This frontend communicates with the backend API via:
- `http://localhost:8080/api/login` → Login (returns JWT)
- `https:localhost:8080/api/stores` → Store management
- `http://localhost:8080/api/customers` → Customer management

## Installation & Running
```bash
git clone https://github.com/gianniskorkontzilas/WebbApp-Frontend-React.git
cd frontend-repo
npm install
npm start


Authentication
When logging in, the JWT token is stored in localStorage.
The token is automatically included in API requests for authentication.
Testing
To ensure full functionality:

Start the backend server first.
Log in through the /login page.
Navigate through the application to manage stores and customers.
