import { isModalOpen } from "../../actions/loginAction";
import "./signInModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


export default function LoginModal () {
  const open = useSelector((state) => state.loginReducer.state);
  const dispatch = useDispatch();

  const [isSignIn, setIsSignIn] = useState(false);

  /**
   * 로그인, 회원가입 모달 open 여부
   */
  const confirm = () => {
    dispatch(isModalOpen(open));
  }

  /**
   * 로그인,회원가입 페이지 전환
   */
  const onToggleModal = () => {
    setIsSignIn(!isSignIn);
  }

  return (
    <>
    {
      !isSignIn
      ? <section className="modal-back signin-section">
          <div className="signin-modal">
            <h1 className="title">Account Book</h1>
            <input type="email" placeholder="이메일 입력하세요"></input>
            <input type="password" placeholder="비밀번호 입력하세요"></input>
            <button onClick={confirm}>로그인하기</button>
            <div className="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span className="sub-info">아직 회원이 아니신가요? <span onClick={() => onToggleModal()}><strong>회원가입</strong></span></span>
          </div>
        </section>
      : <section className="modal-back signup-section">
          <div className="signup-modal">
            <h1 className="title">Account Book</h1>
            <input type="email" placeholder="이메일 입력하세요"></input>
            <input type="password" placeholder="비밀번호 입력하세요"></input>
            <button onClick={confirm}>회원가입하기</button>
            <div className="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span className="sub-info">이미 계정이 있으신가요? <span onClick={() => onToggleModal()}><strong>로그인</strong></span></span>
          </div>
        </section>
    }
    </>
  )
}