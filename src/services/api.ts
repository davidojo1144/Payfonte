import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    'https://api.payfonte.com/payfusion/public/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle global API errors here (e.g. 401 Unauthorized)
    return Promise.reject(error);
  }
);

export default api;
