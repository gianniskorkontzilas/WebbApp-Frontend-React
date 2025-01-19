import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',  
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');  

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,  
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {  
      localStorage.removeItem('token');  
      window.location.href = '/login'; 
    }
    return Promise.reject(error);  
  }
);

export default axiosInstance;
