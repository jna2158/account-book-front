import { isModalOpen } from "../../actions/loginAction";
import "./signInModal.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../../shared/global-regular-expression';
import { API_HOST } from "../../constant";


export default function LoginModal () {
  const open = useSelector((state) => state.loginReducer.state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!email.length) {
      isEmailValid(false);
    } else {
      isEmailValid(true);
    }

    if (!checkEmail(email) && !errMsg.includes('올바른 이메일 형식을 입력하세요.')) {
      const err = errMsg;
      err.push('올바른 이메일 형식을 입력하세요.');
      setErrMsg(err);
    } else if (checkEmail(email)) {
      let err = errMsg;
      err = err.filter(el => el !== '올바른 이메일 형식을 입력하세요.');
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
      })
      .then(res => {
        // 로그인 성공했을 때
        if (res.status === 200) {
          confirm();
          localStorage.setItem("refresh_token", res.data.jwt_token.access_token);
          localStorage.setItem("nickname", res.data.user.nickname);
          navigate("/");
        }
        setSubmit(false);
      })
      .catch(e => {
        setSubmit(false);
        if (e.response.data.message) {
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
    if (!checkEmail(email) && !errMsg.includes('올바른 이메일 형식을 입력하세요.')) {
      const err = errMsg;
      err.push('올바른 이메일 형식을 입력하세요.');
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
      });
    }
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
                <input type="text"
                  placeholder="이메일 입력하세요"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></input>
                {
                  (submit && !emailValid) && <span className="validation">필수값입니다</span>
                }
                {
                  (submit && emailValid && errMsg.includes('올바른 이메일 형식을 입력하세요.')) && <span className="validation">올바른 이메일 형식을 입력하세요.</span>
                }
                {
                  (errMsg.includes('존재하지않는 아이디입니다.')) && <span className="validation">존재하지않는 아이디입니다.</span>
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
              {
                (errMsg.includes('비밀번호가 일치하지않습니다..')) && <span className="validation">비밀번호가 일치하지않습니다..</span>
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
                <input type="text" placeholder="이메일 입력하세요" value={email} onChange={e => setEmail(e.target.value)}></input>
                {
                  (submit && !emailValid) && <span className="validation">필수값입니다</span>
                }
                {
                  (submit && emailValid && errMsg.includes('올바른 이메일 형식을 입력하세요.')) && <span className="validation">올바른 이메일 형식을 입력하세요.</span>
                }
                {
                  (errMsg.includes('user with this email already exists.')) && <span className="validation">이미 존재하는 이메일 입니다.</span>
                }
              </div>
              <div>
                <input type="password" placeholder="비밀번호 입력하세요" value={password} onChange={e => setPassword(e.target.value)}></input>
                {
                  (submit && !passwordValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              <div>
                <input type="text" placeholder="이름을 입력하세요" value={username} onChange={e => setUserName(e.target.value)}></input>
                {
                  (submit && !usernameValid) && <span className="validation">필수값입니다</span>
                }
              </div>
              <div>
                <input type="text" placeholder="닉네임을 입력하세요" value={nickname} onChange={e => setNickName(e.target.value)}></input>
                {
                  (submit && !nicknameValid) && <span className="validation">필수값입니다</span>
                }
                {
                  (errMsg.includes('user with this nickname already exists.')) && <span className="validation">이미 존재하는 닉네임 입니다.</span>
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