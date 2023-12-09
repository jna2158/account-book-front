import "./requireAuth.css";
import { useNavigate } from 'react-router-dom';

export default function RequireAuth() {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <section className="auth-section">
        로그인이 필요한 기능입니다.
        <button onClick={() => navigate('/')}>닫기</button>
      </section>
    </div>
  );
};
