// import axiosInstance from './axiosInstance';

// interface Customer {
//   id: string;
//   vatNumber: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   storeId: string;
// }

// interface CustomerData {
//   vatNumber: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   storeId: string;
// }

// export const getAllCustomers = async (): Promise<Customer[]> => {
//   try {
//     const response = await axiosInstance.get('customers');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching customers', error);
//     throw error;
//   }
// };

// export const createCustomer = async (customerData: CustomerData): Promise<Customer> => {
//   try {
//     const response = await axiosInstance.post('customers', customerData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating customer', error);
//     throw error;
//   }
// };

// export const updateCustomer = async (customerId: string, customerData: CustomerData): Promise<Customer> => {
//   try {
//     const response = await axiosInstance.put(`customers/${customerId}`, customerData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating customer', error);
//     throw error;
//   }
// };

// export const deleteCustomer = async (customerId: string): Promise<void> => {
//   try {
//     await axiosInstance.delete(`customers/${customerId}`);
//   } catch (error) {
//     console.error('Error deleting customer', error);
//     throw error;
//   }
// };


import axiosInstance from '../api/axiosInstance';

const API_URL = 'http://localhost:8080/api/customers'; 

export const customerService = {

  getCustomers: async (storeId: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/store/${storeId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customers');
    }
  },

  getCustomerById: async (customerId: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${customerId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customer');
    }
  },

  createCustomer: async (storeId: string, customer: any) => {
    try {
      await axiosInstance.post(`${API_URL}/store/${storeId}`, customer);
    } catch (error) {
      throw new Error('Failed to create customer');
    }
  },

  updateCustomer: async (customerId: string, customer: any) => {
    try {
      await axiosInstance.put(`${API_URL}/${customerId}`, customer);
    } catch (error) {
      throw new Error('Failed to update customer');
    }
  },

  deleteCustomer: async (customerId: number) => {
    try {
      await axiosInstance.delete(`${API_URL}/${customerId}`);
    } catch (error) {
      throw new Error('Failed to delete customer');
    }
  },
};

