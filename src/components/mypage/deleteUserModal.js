import axios from "axios";
import { useState } from "react";
import { API_HOST } from "../../constant";
import "./deleteUserModal.css";
import { useNavigate } from 'react-router-dom';

export default function DeleteUserModal() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  /** 탈퇴 요청 */
  const deleteUser = () => {
    const apiUrl = `${API_HOST}/api/accounts/detail/`;
    axios.delete(apiUrl, {
      data: {
        email: JSON.parse(localStorage.getItem('user')).email,
        password
      }
    })
    .then(res => {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    })
    .catch(err => {
        setErrMsg('비밀번호가 일치하지 않습니다.');
        setPassword('');
    })
  }

  return (
    <section className="delete-user-section">
      <input type="text" placeholder="비밀번호를 입력하세요." value={password} onChange={e => setPassword(e.target.value)}/>
      <section className="validation">{errMsg}</section>
      <button className="confirm-btn" onClick={() => deleteUser()}>확인</button>
    </section>
  );
};
