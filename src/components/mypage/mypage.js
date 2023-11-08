import React, { useEffect, useState } from 'react';
import './mypage.css';
import { API_HOST } from '../../constant';
import axios from 'axios';

export default function Mypage() {
  const [formData, setFormData] = useState({
    nickname: '지원',
    username: 'jiwon',
    password: ''
  });
  const [isPasswordModifyMode, setIsPasswordModifyMode] = useState(false);

  useEffect(() => {
    getUserInfo();
  });

  /**
   * 회원의 마이페이지 정보를 가져오는 함수
   */
  const getUserInfo = () => {
    axios({
      method:'get',
      url:`${API_HOST}/api/accounts/detail`,
      headers:{
        'Content-Type':'application/json',
        Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      },
      body: JSON.parse(localStorage.getItem('user')).email
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      throw err;
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
    </div>
  );
}