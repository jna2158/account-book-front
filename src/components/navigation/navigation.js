import { Content } from '../content/content';
import { Chart } from '../chart/chart';
import { Calendar } from '../mainpage/calendar';
import LoginModal from '../login/loginModal';
import './navigation.css';

import { isModalOpen } from '../../actions/loginAction';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

export default function Navigation() {
  const open = useSelector(state => state.loginReducer.state);
  const dispatch = useDispatch();

  return (
    <div class="container">
      <header>
        <nav>
          <div class="logo">
            <Link to="/">Logo</Link>
          </div>

          <div class="gnb">
            <Link to="/"><a>조회</a></Link>
            <Link to="/chart"><a>차트 보기</a></Link>
            <Link to="/content"><a>소비 습관</a></Link>
          </div>

          <div class="login">
            <a onClick={() => dispatch(isModalOpen(open))}>로그인</a>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" exact={true} element={<Calendar />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
        <Route path="/content" element={<Content />}></Route>
      </Routes>

      <div> {open ? <LoginModal /> : <></> } </div>
    </div>
  )
}