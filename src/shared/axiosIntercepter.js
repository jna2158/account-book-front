import axios from 'axios';
import { updateRefreshToken } from './token';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      updateRefreshToken();
      setTimeout(() => {
        return axios(originalRequest);
      }, 2000);
    }
    return Promise.reject(error);
  }
);