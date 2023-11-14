import React, { useEffect, useState, } from 'react';
import { API_HOST } from '../../constant';
import logo from "../../source/account_baby.png";
import Profile from './profile';
import './mypage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInErrorMsg, signUpErrorMsg } from '../../shared/errorMsgConstant';


export default function Mypage() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    username: '',
    current_password: '',
	  password: '',
    password_check: ''
  });
  const [isPasswordModifyMode, setIsPasswordModifyMode] = useState(false);
  const [isClickProfileBtn, setIsClickProfieBtn] = useState(false);
  const [profile, setProfile] = useState(logo);
  const [errMsg, setErrMsg] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  /**
   * 회원의 마이페이지 정보를 가져오는 함수
   */
  const getUserInfo = () => {
  const apiUrl = `${API_HOST}/api/accounts/detail/`;
  const headers = {
    Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  }
  const requestBody = {
    email: JSON.parse(localStorage.getItem('user')).email
  }

  axios.get(apiUrl, {
    headers: headers,
    params: requestBody
  })
  .then(res => {
    setFormData(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}

  /**
   * 회원의 탈퇴 요청을 보내는 함수
   */
  const deleteUser = () => {
    const password = prompt("비밀번호를 입력하세요", "");
    if (!password) {
      return;
    }
    const apiUrl = `${API_HOST}/api/accounts/detail/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
 
    axios.delete(apiUrl, {
      data: {
        email: JSON.parse(localStorage.getItem('user')).email,
        password
      },
      headers: headers
    })
    .then(res => {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    })
    .catch(err => {
        alert('비밀번호가 일치하지 않습니다.');
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  /**
   * 회원 정보를 변경하는 함수
   */
  const saveUserInfo = () => {
    delete formData.username;

    if (!formData.current_password || !formData.password || !formData.password_check) {
      delete formData.current_password;
      delete formData.password;
      delete formData.password_check;
    }

    const apiUrl = `${API_HOST}/api/accounts/detail/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
 
    axios.patch(apiUrl, formData, {
      headers: headers
    })
    .then(res => {
      getUserInfo();
    })
    .catch(e => {
      if (e && e.response && e.response.data.password) {
        const err = errMsg;
        err.push(e.response.data.password[0]);
        setErrMsg(err)
      }
      if (e && e.response && e.response.data.username) {
        const err = errMsg;
        err.push(e.response.data.username[0]);
        setErrMsg(err)
      }
      if (e && e.response && e.response.data.message) {
        const err = errMsg;
        err.push(e.response.data.message);
        setErrMsg(err);
      }
      getUserInfo();
    })
  }

  /**
   * 프로필 변경
   */
  const changeMyProfile = () => {
    setIsClickProfieBtn(!isClickProfileBtn);
  }

  return (
    <div className='mypage_section'>
      <form onSubmit={handleSubmit}>
        <div onClick={() => changeMyProfile()}>
          <a>프로필 사진</a>
          <img className="profile" src={profile}></img>
        </div>
        {
          isClickProfileBtn ? <Profile setProfile={setProfile} setIsClickProfieBtn={setIsClickProfieBtn}/> : ''
        }

        <div>
          <a>이메일</a>
          <input
                disabled
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
        </div>

        <div>
          <a>이름</a>
          <input
                disabled
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
        </div>

        <div>
          <a>닉네임</a>
          <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
              />
        </div>
        
        <div className='password_section'>
          <a>비밀번호</a>
            <span>
              <input
                type="password"
                id="current_password"
                name="current_password"
                placeholder='현재 비밀번호'
                onChange={handleInputChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder='새 비밀번호'
                onChange={handleInputChange}
              />
              <input
                type="password"
                id="password_check"
                name="password_check"
                placeholder='새 비밀번호 확인'
                onChange={handleInputChange}
              />
          </span>
        </div>
        {
          (errMsg.includes(`${signUpErrorMsg.password[0]}`)) && <span className="validation">{`${signUpErrorMsg.password[0]}`}</span>
        }
        {
          (errMsg.includes(`${signUpErrorMsg.username[0]}`)) && <span className="validation">{`${signUpErrorMsg.username[0]}`}</span>
        }
        {
          (errMsg.includes(`${signInErrorMsg.invalidPassword}`)) && <span className="validation">{`${signInErrorMsg.invalidPassword}`}</span>
        }
        <section className='button_section'>
          <button type="submit" onClick={() => saveUserInfo()}>저장</button>
          <button type="button" onClick={() => deleteUser()}>회원탈퇴</button>
        </section>
      </form>
    </div>
  );
}