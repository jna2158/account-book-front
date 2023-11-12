import axios from 'axios';
import { API_HOST } from '../constant';

export const updateRefreshToken = () => {
  axios.post(`${API_HOST}/api/accounts/login/refresh/`)
  .then(res => {
    console.log(res);

    return res.data.access;
  })
  .catch(err => {
    throw err;
  })
}