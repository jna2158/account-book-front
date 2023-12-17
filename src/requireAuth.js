import { useLocation, useNavigate } from 'react-router-dom';
import "./requireAuth.css";
import logo from "../src/source/account-book-logo.png";

export default function RequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {

    location.pathname === "/" ? window.location.reload() : navigate('/');
  }

  return (
    <div className="modal-overlay">
      <section className="auth-section">
      <div className="title"><img className="modal-logo" src={logo}></img></div>
        <p className="sub_title">
          로그인이 필요한 기능입니다.
          <br />
          지금 로그인하고<br /><span className='sub_title_emphasis'>ACCOUNT BOOK의 모든 기능을</span><br />이용해보세요.
        </p>
        <button className="close-btn" onClick={() => closeModal()}>닫기</button>
      </section>
    </div>
  );
};
