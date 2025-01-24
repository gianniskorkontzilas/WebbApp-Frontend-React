// import axiosInstance from '../api/axiosInstance';

// const API_URL = 'http://localhost:8080/api/customers'; 

// export const customerService = {

//   getCustomers: async (storeId: string) => {
//     try {
//       const response = await axiosInstance.get(`${API_URL}/store/${storeId}`);
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to fetch customers');
//     }
//   },

//   getCustomerById: async (customerId: string) => {
//     try {
//       const response = await axiosInstance.get(`${API_URL}/${customerId}`);
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to fetch customer');
//     }
//   },

//   createCustomer: async (storeId: string, customer: any) => {
//     try {
//       await axiosInstance.post(`${API_URL}/store/${storeId}`, customer);
//     } catch (error) {
//       throw new Error('Failed to create customer');
//     }
//   },

//   updateCustomer: async (customerId: string, customer: any) => {
//     try {
//       await axiosInstance.put(`${API_URL}/${customerId}`, customer);
//     } catch (error) {
//       throw new Error('Failed to update customer');
//     }
//   },

//   deleteCustomer: async (customerId: number) => {
//     try {
//       await axiosInstance.delete(`${API_URL}/${customerId}`);
//     } catch (error) {
//       throw new Error('Failed to delete customer');
//     }
//   },

//   getCustomersByStore: async (storeId: string) => {
//     try {
//       const response = await axiosInstance.get(`${API_URL}/store/${storeId}`);
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to fetch customers by store');
//     }
//   },

//   getCustomerByVatNumber: async (vatNumber: string) => {
//     try {
//       const response = await axiosInstance.get(`${API_URL}/search?vatNumber=${vatNumber}`);
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to fetch customer by VAT number');
//     }
//   },
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

  getCustomersByStore: async (storeId: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/store/${storeId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customers by store');
    }
  },

  getCustomerByVatNumber: async (vatNumber: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/search?vatNumber=${vatNumber}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customer by VAT number');
    }
  },
};
