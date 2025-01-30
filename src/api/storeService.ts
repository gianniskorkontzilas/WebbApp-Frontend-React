import axiosInstance from '../api/axiosInstance.ts';
const API_URL = 'http://localhost:8080/api/stores'; 

export const storeService = {
  getStores: async () => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch stores');
    }
  },
  
  getStoreById: async (storeId: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${storeId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch store');
    }
  },

  createStore: async (store: { name: string }) => {
    try {
      await axiosInstance.post(API_URL, store);
    } catch (error) {
      throw new Error('Failed to create store');
    }
  },

  updateStore: async (storeId: string, store: { name: string }) => {
    try {
      await axiosInstance.put(`${API_URL}/${storeId}`, store);
    } catch (error) {
      throw new Error('Failed to update store');
    }
  },

  deleteStore: async (storeId: string) => {
    try {
      await axiosInstance.delete(`${API_URL}/${storeId}`);
    } catch (error) {
      throw new Error('Failed to delete store');
    }
  }
};
