import "./loginModal.css";

import { isModalOpen } from "../../actions/loginAction";
import { useSelector, useDispatch } from "react-redux";

export default function LoginModal () {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.loginReducer.state);

  const confirm = () => {
    dispatch(isModalOpen(open));
  }

  return (
    <>
      <section className="loginSection">
        <div className="loginModal">
          <h1>로그인</h1>
          <input type="email" placeholder="이메일 입력하세요"></input>
          <input type="password" placeholder="비밀번호 입력하세요"></input>
          <button onClick={confirm}>확인</button>
        </div>
      </section>
    </>
  )
}