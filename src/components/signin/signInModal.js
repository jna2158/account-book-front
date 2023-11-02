import { isModalOpen } from "../../actions/loginAction";
import "./signInModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_HOST } from "../../constant";


export default function LoginModal () {
  const open = useSelector((state) => state.loginReducer.state);
  const dispatch = useDispatch();

  const [isSignIn, setIsSignIn] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValid, isEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValid, isPasswordValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!email.length) {
      isEmailValid(false);
    } else {
      isEmailValid(true);
    }

    if (!password.length) {
      isPasswordValid(false);
    } else {
      isPasswordValid(true);
    }
  }, [email, password]);

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
    setEmail('');
    setPassword('');
    isEmailValid(true);
    isPasswordValid(true);
    setIsSignIn(!isSignIn);
  }

  /**
   * 로그인 버튼 눌렀을 때 호출되는 함수
   */
  const onClickSignIn = () => {
    setSubmit(true);

    if (!email.length) {
      isEmailValid(false);
    }
    if (!password.length) {
      isPasswordValid(false);
    }

    axios.get(`${API_HOST}/signin`)
    .then(res => {
      console.log('Success');
      setSubmit(false);
    })
    .catch(err => {
      console.log(err);
      setSubmit(false);
    });
  }

  /**
   * 회원가입 버튼 눌렀을 때 호출되는 함수
   */
  const onClickSignUp = () => {
    setSubmit(true);

    if (!email.length) {
      isEmailValid(false);
    }
    if (!password.length) {
      isPasswordValid(false);
    }

    axios.get("https://account-book.store/accounts/signup")
    .then(res => {
      console.log('Success');
      setSubmit(false);
    })
    .catch(err => {
      console.log(err);
      setSubmit(false);
    });
  }

  return (
    <>
    {
      !isSignIn
      ? <section className="modal-back signin-section">
          <div className="signin-modal">
          <span><i className="fa-solid fa-x" onClick={confirm}></i></span>
            <h1 className="title">Account Book</h1>
             <form onSubmit={e=> e.preventDefault()}>
              <div>
                <input type="email"
                  placeholder="이메일 입력하세요"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></input>
                {
                  (submit && !emailValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              <div>
              <input type="password"
                placeholder="비밀번호 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></input>
              {
                (submit && !passwordValid) && <span className="validation">필수값입니다</span>
              }
              </div>
              <button onClick={onClickSignIn}>로그인하기</button>
              <div className="social-container">
                <a href="#" className="social"><i class="fa-solid fa-n"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i class="fa-solid fa-k"></i></a>
              </div>
            </form>
            <span className="sub-info">아직 회원이 아니신가요? <span onClick={() => onToggleModal()}><strong>회원가입</strong></span></span>
          </div>
        </section>
      : <section className="modal-back signup-section">
          <div className="signup-modal">
          <span><i className="fa-solid fa-x" onClick={confirm}></i></span>
            <h1 className="title">Account Book</h1>
            <form onSubmit={e=> e.preventDefault()}>
              <div>
                <input type="email" placeholder="이메일 입력하세요"></input>
                {
                  (submit && !emailValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              <div>
                <input type="password" placeholder="비밀번호 입력하세요"></input>
                {
                  (submit && !passwordValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              <div>
                <input type="text" placeholder="이름을 입력하세요"></input>
                {
                  (submit && !passwordValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              <div>
                <input type="text" placeholder="닉네임을 입력하세요"></input>
                {
                  (submit && !passwordValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              
              <button onClick={onClickSignUp}>회원가입하기</button>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </form>
            <span className="sub-info">이미 계정이 있으신가요? <span onClick={() => onToggleModal()}><strong>로그인</strong></span></span>
          </div>
        </section>
    }
    </>
  )
}