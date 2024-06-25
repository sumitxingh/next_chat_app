import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from './constants';
import Router from 'next/router';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);

    console.dir(error.response, { depth: 'infinite' });
    console.log(error.response.status);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        console.log(`Refreshing refresh token: ${refreshToken}`);
        if (refreshToken) {
          const response = await axios.get(`${BASE_URL}/auth/refresh`, {
            headers: { 'Authorization': 'Bearer ' + refreshToken }
          });
          const { access_token, refresh_token } = response.data.response_data.data.tokens;
          const user = response.data.response_data.data.user;
          Cookies.set("accessToken", access_token);
          Cookies.set("refreshToken", refresh_token);
          localStorage.setItem("user", JSON.stringify(user));
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axiosInstance(originalRequest);
        } else {
          localStorage.removeItem("user");
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          // Ensure we are in a client-side context
          if (typeof window !== 'undefined') {
            window.location.href = '/auth';
          }
        }
      } catch (refreshError) {
        localStorage.removeItem("user");
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        // Ensure we are in a client-side context
        if (typeof window !== 'undefined') {
          window.location.href = '/auth';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
