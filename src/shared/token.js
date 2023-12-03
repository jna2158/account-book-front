import axios from 'axios';
import { API_HOST } from '../constant';

export const updateRefreshToken = async () => {
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

// async function updateRefreshToken() {
//   try {
//     // 토큰 업데이트 로직
//     return 'success';
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }