import axios from 'axios';
import { API_HOST } from '../constant';

export const updateRefreshToken = () => {
  axios.post(`${API_HOST}/api/accounts/login/refresh/`)
  .then(res => {
    localStorage.setItem('ACCESS_TOKEN', JSON.stringify(res.data.access_token));
    console.log(localStorage.getItem('ACCESS_TOKEN'));
  })
  .catch(err => {
    throw err;
  })
}