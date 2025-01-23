import axiosInstance from '../api/axiosInstance.ts';

interface Credentials {
  login: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginUser = async (credentials: Credentials): Promise<string> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('auth/login', credentials); 
    const token = response.data.token;
    localStorage.setItem('token', token); 
    return token;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};


