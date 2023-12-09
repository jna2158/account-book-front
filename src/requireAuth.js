import "./requireAuth.css";
import { useNavigate } from 'react-router-dom';
import logo from "../src/source/account-book-logo.png";

export default function RequireAuth() {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <section className="auth-section">
      <div className="title"><img className="modal-logo" src={logo}></img></div>
        <p className="sub_title">
          로그인이 필요한 기능입니다.
          <br />
          지금 로그인하고 ACCOUNT BOOK의<br />모든 기능을 이용해보세요.
        </p>
        <button className="close-btn" onClick={() => navigate('/')}>닫기</button>
      </section>
    </div>
  );
};
