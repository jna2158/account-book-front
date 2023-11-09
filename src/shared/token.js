import axios from "axios"

export const updateRefreshToken = () => {
  axios.post('https://account-book.store/api/accounts/login/refresh/')
  .then(res => {
    console.log(res);
    return res;
  })
  .catch(err => {
    throw err;
  })
}