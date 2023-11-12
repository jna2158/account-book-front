import Mypage from '../../mypage/mypage';
import { API_HOST } from '../../../constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateRefreshToken } from '../../../shared/token';
import { NavLink, Routes, Route } from 'react-router-dom';
import "./profileDropdown.css";

export default function ProfileDropdown({setClickProfile}) {
  const navigate = useNavigate();

  /**
     * 회원의 로그아웃 요청을 보내는 함수
     */
  const logoutUser = () => {
    const apiUrl = `${API_HOST}/api/accounts/logout/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }

    axios.post(apiUrl, null, {
      headers: headers
    })
    .then(res => {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401) {
        const newToken = updateRefreshToken();
        if (newToken) {
          localStorage.setItem('ACCESS_TOKEN', newToken);
          logoutUser();
        }
      }
      throw err
    })
  }

  return (
    <section className="profile_dropdown_section">
      <ul>
        <NavLink to="/mypage" className="link_selected"><li onClick={() => setClickProfile(false)}>마이페이지</li></NavLink>
        <li onClick={() => logoutUser()}>로그아웃</li>
      </ul>
    </section>
  )
}