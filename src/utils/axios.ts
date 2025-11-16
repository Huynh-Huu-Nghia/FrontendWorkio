import axios from 'axios';

const envBase = (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_API_BASE_URL) || '';
export const axiosInstance = axios.create({
  // Nếu env để trống -> dùng proxy (tương đối). Nếu có -> dùng trực tiếp.
  baseURL: envBase.length ? envBase : undefined,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Token invalid/expired -> clear and optionally redirect
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.reject(error);
  }
);
