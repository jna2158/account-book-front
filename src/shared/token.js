import axios from 'axios';
import { API_HOST } from '../constant';

export const updateRefreshToken = () => {
  axios.post(`${API_HOST}/api/accounts/login/refresh/`)
  .then(res => {
    return res.data.access_token;
  })
  .catch(err => {
    throw err;
  })
}