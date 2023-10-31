import { isModalOpen } from "../../actions/loginAction";
import "./signInModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { API_HOST } from "../../constant";


export default function LoginModal () {
  const open = useSelector((state) => state.loginReducer.state);
  const dispatch = useDispatch();
  let submit = false;
  let isError = [];

  const [isSignIn, setIsSignIn] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

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

  /**
   * 로그인 버튼 눌렀을 때 호출되는 함수
   */
  const onClickSignIn = () => {
    submit = true;
    isError = [];

    if (errorCheck().length !== 0) {
      
      return;
    }

    axios.get(`${API_HOST}/login`)
    .then(res => {
      console.log('Success');
      submit = false;
    })
    .catch(err => {
      console.log(err);
      submit = false;
    });
  }

  /**
   * 회원가입 버튼 눌렀을 때 호출되는 함수
   */
  const onClickSignUp = () => {
    //
  }

  /**
   * 로그인 버튼 눌렀을 때 유효성 검사
   */
  const errorCheck = () => {
    const email = form.email;
    const password = form.password;

    if (!email) {
      isError.push('email is required');
    }
    if (!password) {
      isError.push('password is required');
    }
    return isError;
  }

  return (
    <>
    {
      !isSignIn
      ? <section className="modal-back signin-section">
          <div className="signin-modal">
            <h1 className="title">Account Book</h1>
             <form onSubmit={e=> e.preventDefault()}>
              <input type="email"
                placeholder="이메일 입력하세요"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              ></input>
              <input type="password"
                placeholder="비밀번호 입력하세요"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
              ></input>
              <button onClick={onClickSignIn}>로그인하기</button>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </form>
            <span className="sub-info">아직 회원이 아니신가요? <span onClick={() => onToggleModal()}><strong>회원가입</strong></span></span>
          </div>
        </section>
      : <section className="modal-back signup-section">
          <div className="signup-modal">
            <h1 className="title">Account Book</h1>
            <input type="email" placeholder="이메일 입력하세요"></input>
            <input type="password" placeholder="비밀번호 입력하세요"></input>
            <button onClick={onClickSignUp}>회원가입하기</button>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="sub-info">이미 계정이 있으신가요? <span onClick={() => onToggleModal()}><strong>로그인</strong></span></span>
          </div>
        </section>
    }
    </>
  )
}