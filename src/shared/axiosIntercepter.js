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
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const res = await updateRefreshToken();
      if (res === 'success') {
        return axios.request(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);