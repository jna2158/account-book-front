import React, { useEffect, useState, } from 'react';
import { API_HOST } from '../../constant';
import logo from "../../source/account_baby.png";
import Profile from './profile';
import './mypage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateRefreshToken } from '../../shared/token';
export default function Mypage() {
  const [formData, setFormData] = useState({
    email: 'jiwonemail',
    id: 'jiwonid',
    nickname: 'nickname',
    username: 'username'
  });
  const [isPasswordModifyMode, setIsPasswordModifyMode] = useState(false);
  const [isClickProfileBtn, setIsClickProfieBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  /**
   * 회원의 마이페이지 정보를 가져오는 함수
   */
  const getUserInfo = () => {
  // const apiUrl = `${API_HOST}/api/accounts/detail/`;
  // const headers = {
  //   Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  // }
  // const requestBody = {
  //   email: JSON.parse(localStorage.getItem('user')).email
  // }

  // axios.get(apiUrl, {
  //   headers: headers,
  //   params: requestBody
  // })
  // .then(res => {
  //   setFormData(res.data);
  // })
  // .catch(err => {
  //   throw err
  // })
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
      throw err
    })
  }

  /**
   * 회원의 로그아웃 요청을 보내는 함수
   */
  const logoutUser = () => {
    const apiUrl = `${API_HOST}/api/accounts/logout/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }

    axios.post(apiUrl, null, {
      headers: headers
    })
    .then(res => {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401) {
        const newToken = updateRefreshToken();
        console.log('newToken');
        console.log(newToken);
      }
      throw err
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
          <img className="profile" src={logo}></img>
        </div>
        {
          isClickProfileBtn ? <Profile /> : ''
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
                required
              />
        </div>

        <div>
          <a>아이디</a>
          <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
        </div>

        <div>
          <a>닉네임</a>
          <input
                disabled
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                required
              />
        </div>
        
        <div className='password_section'>
          <a>비밀번호</a>
            <span>
              <input
                type="password"
                id="username"
                name="username"
                placeholder='현재 비밀번호'
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                id="username"
                name="username"
                placeholder='새 비밀번호'
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                id="username"
                name="username"
                placeholder='새 비밀번호 확인'
                onChange={handleInputChange}
                required
              />
          </span>
          {/* <button type="submit" onClick={() => setIsPasswordModifyMode(!isPasswordModifyMode)}>취소</button> */}
          {/* {
          !isPasswordModifyMode
          ? <button type="submit" onClick={() => setIsPasswordModifyMode(!isPasswordModifyMode)}>수정</button>
          : (
            <>
            <span>
              <input
                type="password"
                id="username"
                name="username"
                placeholder='현재 비밀번호'
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                id="username"
                name="username"
                placeholder='새 비밀번호'
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                id="username"
                name="username"
                placeholder='새 비밀번호 확인'
                onChange={handleInputChange}
                required
              />
            </span>
            <button type="submit" onClick={() => setIsPasswordModifyMode(!isPasswordModifyMode)}>취소</button>
            </>
          )
        } */}
        </div>
        <section className='button_section'>
          <button type="submit">확인</button>
          <button type="button" onClick={() => deleteUser()}>회원탈퇴</button>
          <button type="button" onClick={() => logoutUser()}>로그아웃</button>
        </section>
      </form>
    </div>
  );
}