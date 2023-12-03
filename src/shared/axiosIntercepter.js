import axios from 'axios';
import { API_HOST } from '../constant';

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
      const res = await updateRefreshToken();
      if (res === 'success') {
        return retryOriginalRequest(error);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// refreshToken 업데이트
const updateRefreshToken = async () => {
  return axios.post(`${API_HOST}/api/accounts/login/refresh/`)
  .then(res => {
    localStorage.setItem('ACCESS_TOKEN', res.data.access_token);
    return 'success';
  })
  .catch(err => {
    return 'fail';
  })
}

// refreshToken 업데이트 후 이전 요청 다시보내기
const retryOriginalRequest = async (error) => {
  try {
    const originalRequest = error.config;
    return axios(originalRequest);
  } catch (refreshError) {
    return Promise.reject(error);
  }
};