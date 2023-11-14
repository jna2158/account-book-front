import { isModalOpen } from "../../actions/loginAction";
import { checkEmail } from '../../shared/global-regular-expression';
import { signInErrorMsg, signUpErrorMsg, errorMsg } from "../../shared/errorMsgConstant";
import "./signInModal.css";
import logo from "../../source/account-book-logo.png";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Cookies } from "react-cookie";


export default function LoginModal () {
  const open = useSelector((state) => state.loginReducer.state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();

  const [isSignIn, setIsSignIn] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValid, isEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValid, isPasswordValid] = useState(true);
  const [username, setUserName] = useState('');
  const [usernameValid, isUserNameValid] = useState(true);
  const [nickname, setNickName] = useState('');
  const [nicknameValid, isNickNameValid] = useState(true);
  const [errMsg, setErrMsg] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    if (!email.length) {
      isEmailValid(false);
    } else {
      isEmailValid(true);
    }

    if (!checkEmail(email) && !errMsg.includes(errorMsg.invalidEmailFormat)) {
      const err = errMsg;
      err.push(errorMsg.invalidEmailFormat);
      setErrMsg(err);
    } else if (checkEmail(email)) {
      let err = errMsg;
      err = err.filter(el => el !== errorMsg.invalidEmailFormat);
      setErrMsg(err);
    }

    if (!password.length) {
      isPasswordValid(false);
    } else {
      isPasswordValid(true);
    }

    if (!username.length) {
      isUserNameValid(false);
    } else {
      isUserNameValid(true);
    }

    if (!nickname.length) {
      isNickNameValid(false);
    } else {
      isNickNameValid(true);
    }
  }, [email, password, username, nickname]);

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
    setUserName('');
    setNickName('');
    isEmailValid(true);
    isPasswordValid(true);
    isUserNameValid(true);
    isNickNameValid(true);
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

    if (emailValid && passwordValid) {
      axios.post(`https://account-book.store/api/accounts/login/`, {
        "email": email,
        "password": password
      }, {withCredentials: true})
      .then(res => {
        // 로그인 성공했을 때
        if (res.status === 200) {
          confirm();
          // access token은 local storage에, refresh token은 cookie에 저장
          const ACCESS_TOKEN = res.data.jwt_token.access_token;
          localStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        setSubmit(false);
      })
      .catch(e => {
        setSubmit(false);
        if (e.response && e.response.data.message) {
          const err = errMsg;
          err.push(e.response.data.message);
          setErrMsg(err);
        }
      });
    }
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
    if (!username.length) {
      isUserNameValid(false);
    }
    if (!nickname.length) {
      isNickNameValid(false);
    }
    if (!checkEmail(email) && !errMsg.includes(errorMsg.invalidEmailFormat)) {
      const err = errMsg;
      err.push(errorMsg.invalidEmailFormat);
      setErrMsg(err);
    }

    if (emailValid && passwordValid && usernameValid && nicknameValid) {
      axios.post("https://account-book.store/api/accounts/signup/",
      {
        "email": email,
        "password": password,
        "username": username,
        "nickname": nickname
      })
      .then(res => {
        // 회원가입 성공했을 때
        if (res.status === 201) {
          setIsSignIn(!isSignIn);
        }
        setSubmit(false);
      })
      .catch(e => {
        setSubmit(false);
        if (e.response.data.email) {
          const err = errMsg;
          err.push(e.response.data.email[0]);
          setErrMsg(err);
        }
        if (e.response.data.nickname) {
          const err = errMsg;
          err.push(e.response.data.nickname[0]);
          setErrMsg(err);
        }
        if (e.response.data.username) {
          const err = errMsg;
          err.push(e.response.data.username[0]);
          setErrMsg(err);
        }
        if (e.response.data.password) {
          const err = errMsg;
          err.push(e.response.data.password[0]);
          setErrMsg(err);
        }
      });
    }
  }

  return (
    <>
    
    {open && (
        <div className="modal-overlay">
        </div>
      )
    }

    {
      !isSignIn
      ? <section className="signin-section">
          <div className="signin-modal">
          <span><i className="fa-solid fa-x" onClick={confirm}></i></span>
            <div className="title"><img className="modal-logo" src={logo}></img></div>
             <form className="user_form" onSubmit={e=> e.preventDefault()}>
              <div>
                <input type="text"
                  placeholder="email을 입력해주세요."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></input>
                {
                  (submit && !emailValid) && <div className="validation">{errorMsg.requiredField}</div>
                }
                {
                  (submit && emailValid && errMsg.includes(`${errorMsg.invalidEmailFormat}`)) && <div className="validation">{errorMsg.invalidEmailFormat}</div>
                }
                {
                  (errMsg.includes(`${signInErrorMsg.invalidEmail}`)) && <div className="validation">{`${signInErrorMsg.invalidEmail}`}</div>
                }
              </div>
              <div>
              <input type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></input>
              {
                (submit && !passwordValid) && <div className="validation">{errorMsg.requiredField}</div>
              }
              {
                (errMsg.includes(`${signInErrorMsg.invalidPassword}`)) && <div className="validation">{signInErrorMsg.invalidPassword}</div>
              }
              </div>
              <div>
                <button className="signin-btn" onClick={onClickSignIn}>로그인</button>
                <button className="signup-btn" onClick={() => onToggleModal()}>회원가입</button>
              </div>
              
              {/* <div className="social-container">
                <a href="#" className="social"><i className="fa-solid fa-n"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fa-solid fa-k"></i></a>
              </div> */}
            </form>
            {/* <span className="sub-info">아직 회원이 아니신가요? <span onClick={() => onToggleModal()}><strong>회원가입</strong></span></span> */}
          </div>
        </section>
      : <section className="signup-section">
          <div className="signup-modal">
          <span><i className="fa-solid fa-x" onClick={confirm}></i></span>
          <div className="title"><img className="modal-logo" src={logo}></img></div>
            <form className="user_form" onSubmit={e=> e.preventDefault()}>
              <div>
                <a>이메일: </a>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                {
                  (submit && !emailValid) && <div className="validation">{errorMsg.requiredField}</div>
                }
                {
                  (submit && emailValid && errMsg.includes(errorMsg.invalidEmailFormat)) && <div className="validation">{errorMsg.invalidEmailFormat}</div>
                }
                {
                  (errMsg.includes(`${signUpErrorMsg.email[0]}`)) && <div className="validation">{signUpErrorMsg.email[0]}</div>
                }
              </div>

              <div>
                <a>비밀번호: </a>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                {
                  (submit && !passwordValid) && <div className="validation">{errorMsg.requiredField}</div>
                }
                {
                  (errMsg.includes(`${signUpErrorMsg.password[0]}`)) && <div className="validation">{signUpErrorMsg.password[0]}</div>
                }
              </div>

              <div>
                <a>이름: </a>
                <input type="text" value={username} onChange={e => setUserName(e.target.value)}></input>
                {
                  (submit && !usernameValid) && <div className="validation">{errorMsg.requiredField}</div>
                }
                {
                  (errMsg.includes(`${signUpErrorMsg.username[0]}`)) && <div className="validation">{signUpErrorMsg.username[0]}</div>
                }
              </div>

              <div>
                <a>닉네임: </a>
                <input type="text" value={nickname} onChange={e => setNickName(e.target.value)}></input>
                {
                  (submit && !nicknameValid) && <div className="validation">{errorMsg.requiredField}</div>
                }
                {
                  (errMsg.includes(`${signUpErrorMsg.nickname[0]}`)) && <div className="validation">{signUpErrorMsg.nickname[0]}</div>
                }
              </div>
              
              <button onClick={onClickSignUp}>회원가입</button>
              {/* <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div> */}
            </form>
            {/* <span className="sub-info">이미 계정이 있으신가요? <span onClick={() => onToggleModal()}><strong>로그인</strong></span></span> */}
          </div>
        </section>
    }
    </>
  )
}