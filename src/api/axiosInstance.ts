// // import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// // const axiosInstance: AxiosInstance = axios.create({
// //   baseURL: 'http://localhost:8080/api/',  
// // });

// // axiosInstance.interceptors.request.use(
// //   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
// //     // const token = localStorage.getItem('token');  

// //     // if (!config.headers) {
// //     //   config.headers = new AxiosHeaders();
// //     // }

// //     // if (token) {
// //     //   config.headers['Authorization'] = `Bearer ${token}`;  
// //     // }
// //     const token = localStorage.getItem('token');

// // if (!config.headers) {
// //   config.headers = new AxiosHeaders();
// // }

// // console.log('Token from localStorage:', token);

// // if (token) {
// //   config.headers['Authorization'] = `Bearer ${token}`;
// // } else {
// //   console.warn('No token found in localStorage!');
// // }


// //     return config;
// //   },
// //   (error: AxiosError): Promise<AxiosError> => {
// //     console.error('Request error:', error);
// //     return Promise.reject(error);
// //   }
// // );


// // axiosInstance.interceptors.response.use(
// //   (response: AxiosResponse): AxiosResponse => response,  
// //   (error: AxiosError): Promise<AxiosError> => {
// //     if (error.response && error.response.status === 401) {  
// //       localStorage.removeItem('token');  
// //       window.location.href = '/login'; 
// //     }
// //     return Promise.reject(error);  
// //   }
// // );

// // export default axiosInstance;

// import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api/',  
// });

// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const token = localStorage.getItem('token');

//     if (!config.headers) {
//       config.headers = new AxiosHeaders();
//     }

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//       console.log('Token added to request:', token); 
//     } else {
//       console.warn('No token found in localStorage!'); 
//     }

//     return config;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     console.error('Request error:', error);
//     return Promise.reject(error);  
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     return response;  
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     if (error.response && error.response.status === 401) {  
   
//       localStorage.removeItem('token');
//       console.warn('Unauthorized - Token removed');
//       window.location.href = '/login';  
//     } else {
//       console.error('Response error:', error);
//     }
//     return Promise.reject(error);  
//   }
// );

// export default axiosInstance;
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',  
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');  

    if (token) {
      // Αν το token υπάρχει, προσθέτουμε το Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;  
      console.log('Token added to request:', token);  
    } else {
      console.warn('No token found in localStorage!');  
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request error:', error);
    return Promise.reject(error);  
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => {
    return response;  
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {  
      // Αν υπάρχει 401 Unauthorized, αφαιρούμε το token από το localStorage και ανακατευθύνουμε στο login
      localStorage.removeItem('token');  
      console.warn('Unauthorized - Token removed');
      window.location.href = '/login';  
    } else {
      console.error('Response error:', error);
    }
    return Promise.reject(error);  
  }
);

export default axiosInstance;
