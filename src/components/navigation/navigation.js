import { Content } from '../content/content';
import { Chart } from '../chart/chart';
import { Calendar } from '../mainpage/calendar';
import SignInModal from '../signin/signInModal';
import './navigation.css';

import { isModalOpen } from '../../actions/loginAction';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

export default function Navigation() {
  const open = useSelector(state => state.loginReducer.state);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <header>
        <nav>
          <div className="logo">
            <Link to="/">Logo</Link>
          </div>

          <div className="gnb">
            <Link to="/"><a>조회</a></Link>
            <Link to="/chart"><a>차트 보기</a></Link>
            <Link to="/content"><a>소비 습관</a></Link>
          </div>

          <div className="login">
            <a onClick={() => dispatch(isModalOpen(open))}>로그인</a>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" exact={true} element={<Calendar />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
        <Route path="/content" element={<Content />}></Route>
      </Routes>

      <div> {open ? <SignInModal /> : <></> } </div>
    </div>
  )
}