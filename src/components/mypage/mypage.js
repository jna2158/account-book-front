import React, { useEffect, useState, } from 'react';
import { API_HOST } from '../../constant';
import './mypage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateRefreshToken } from '../../shared/token';
export default function Mypage() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    username: ''
  });
  const [isPasswordModifyMode, setIsPasswordModifyMode] = useState(false);
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
    throw err
  })}

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

  return (
    <div className='mypage_section'>
      <h1>마이 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label>닉네임</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          required
        />

        <label>아이디</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label>비밀번호</label>
        {
          !isPasswordModifyMode
          ? <button type="submit" onClick={() => setIsPasswordModifyMode(!isPasswordModifyMode)}>수정</button>
          : (
            <>
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
              <button type="submit" onClick={() => setIsPasswordModifyMode(!isPasswordModifyMode)}>취소</button>
            </>
          )
        }
        
      </form>
      <button type="submit">확인</button>
      <button type="button" onClick={() => deleteUser()}>회원탈퇴</button>
      <button type="button" onClick={() => logoutUser()}>로그아웃</button>
    </div>
  );
}