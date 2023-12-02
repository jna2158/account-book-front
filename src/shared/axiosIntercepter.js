import axios from 'axios';
import { updateRefreshToken } from './token';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    // 여기에 요청 전 공통 처리 로직을 작성합니다.
    // 예: 인증 토큰 추가, 헤더 설정 등
    return config;
  },
  (error) => {
    // 요청이 실패한 경우에 대한 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
  (response) => {
    // 여기에 응답 후 공통 처리 로직을 작성합니다.
    return response;
  },
  (error) => {
    // 응답이 에러인 경우에 대한 처리
    if (error.response && error.response.status === 401) {
      // 401 에러가 발생한 경우 모달을 띄우거나 다른 처리를 수행합니다.
      // updateRefreshToken();
      console.error('Unauthorized:', error.response);
    }
    return Promise.reject(error);
  }
);