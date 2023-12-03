import axios from 'axios';

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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 중복 요청 방지
      return retryOriginalRequest(error, originalRequest);
    }
    return Promise.reject(error);
  }
);

const retryOriginalRequest = async (error, refreshToken) => {
  try {
    const originalRequest = error.config;
    const res = await updateRefreshToken();

    if (res === 'success') {
      return axios(originalRequest);
    } else {
      return Promise.reject(error);
    }
  } catch (refreshError) {
    console.error('Error during refresh token:', refreshError);
    return Promise.reject(error);
  }
};


const updateRefreshToken = async () => {
  axios.post(`${API_HOST}/api/accounts/login/refresh/`)
  .then(res => {
    localStorage.setItem('ACCESS_TOKEN', res.data.access_token);
    return 'success';
  })
  .catch(err => {
    console.log(err);
    return 'fail';
  })
}