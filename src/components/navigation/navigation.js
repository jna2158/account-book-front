import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Content } from '../content/content';
import { Chart } from '../chart/chart';
import { Calendar } from '../mainpage/calendar';
import MyPage from '../mypage/mypage';
import SignInModal from '../signin/signInModal';
import logo from "../../source/account-book-logo.png";
import './navigation.css';

import { isModalOpen } from '../../actions/loginAction';
import { useSelector, useDispatch } from 'react-redux';

export default function Navigation() {
  const open = useSelector(state => state.loginReducer.state);
  const dispatch = useDispatch();

  const isLogin = () => {
    return localStorage.getItem("ACCESS_TOKEN");
  }

  return (
    <section>
      <header>
        <nav>
          <div className="logo">
            <NavLink to="/home" className="link_selected"><a><img className="account-book-logo" src={logo}></img></a></NavLink>
          </div>

          <div className="gnb">
            <NavLink to="/home" className="link_selected"><a>조회</a></NavLink>
            <NavLink to="/chart" className="link_selected"><a>차트 보기</a></NavLink>
            <NavLink to="/content" className="link_selected"><a>소비 습관</a></NavLink>
          </div>

          <div className="login">
            {
              isLogin() ? <NavLink to="/mypage" className="link_selected"><a>{JSON.parse(localStorage.getItem('user')).nickname} 님</a></NavLink> : <a onClick={() => dispatch(isModalOpen(open))}><a>로그인</a></a> 
            }
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" exact={true} element={<Calendar />}/>
        <Route path="/home" element={<Calendar />}/>
        <Route path="/chart" element={<Chart />} />
        <Route path="/content" element={<Content />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>

      <div> {open ? <SignInModal /> : <></> } </div>
    </section>
  )
}
