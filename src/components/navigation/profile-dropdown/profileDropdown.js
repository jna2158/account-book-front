import { API_HOST } from '../../../constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./profileDropdown.css";

export default function ProfileDropdown({setClickProfile}) {
  const navigate = useNavigate();

  /** 로그아웃 */
  const logoutUser = () => {
    const apiUrl = `${API_HOST}/api/accounts/logout/`;
    axios.post(apiUrl, null, {  
      withCredentials: true
    })
    .then(res => {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
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