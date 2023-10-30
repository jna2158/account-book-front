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
      ? <section className="signInSection">
          <div className="signInModal">
            <h1 className="title">Account Bank</h1>
            <input type="email" placeholder="이메일 입력하세요"></input>
            <input type="password" placeholder="비밀번호 입력하세요"></input>
            <button onClick={confirm}>로그인하기</button>
            <img></img>
            <img></img>
            <img></img>
            <span>아직 회원이 아니신가요? <span onClick={() => onToggleModal()}>회원가입</span></span>
          </div>
        </section>
      : <section className="signUpSection">
          <div className="signUpModal">
            <h1 className="title">Account Book</h1>
            <input type="email" placeholder="이메일 입력하세요"></input>
            <input type="password" placeholder="비밀번호 입력하세요"></input>
            <button onClick={confirm}>회원가입하기</button>
            <img></img>
            <img></img>
            <img></img>
            <span>이미 계정이 있으신가요? <span onClick={() => onToggleModal()}>로그인</span></span>
          </div>
        </section>
    }
    </>
  )
}