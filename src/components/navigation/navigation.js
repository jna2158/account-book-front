import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Content } from '../content/content';
import { Chart } from '../chart/chart';
import { Calendar } from '../mainpage/calendar';
import ProfileDropdown from './profile-dropdown/profileDropdown';
import MyPage from '../mypage/mypage';
import SignInModal from '../signin/signInModal';
import logo from "../../source/account-book-logo.png";
import { isModalOpen } from '../../actions/loginAction';
import { useSelector, useDispatch } from 'react-redux';
import RequireAuth from "../../requireAuth";
import './navigation.css';

export default function Navigation() {
  const [clickProfile, setClickProfile] = useState(false);
  const open = useSelector(state => state.loginReducer.state);
  const dispatch = useDispatch();

  /* 회원의 로그인 여부 확인 */
  const isLogin = () => {
    return localStorage.getItem("ACCESS_TOKEN");
  }

  return (
    <section>
      <header>
        <nav>
          <div className="logo">
            <NavLink to="/home" className="link_selected"><a onClick={() => setClickProfile(false)}><img className="account-book-logo" src={logo}></img></a></NavLink>
          </div>

          <div className="gnb">
            <NavLink to="/home" className="link_selected"><a onClick={() => setClickProfile(false)}>캘린더</a></NavLink>
            <NavLink to="/chart" className="link_selected"><a onClick={() => setClickProfile(false)}>차트</a></NavLink>
            <NavLink to="/content" className="link_selected"><a onClick={() => setClickProfile(false)}>뉴스 게시판</a></NavLink>
          </div>

          <div className="login">
            {
              isLogin()
              ? <a onClick={() => setClickProfile(!clickProfile)}>{JSON.parse(localStorage.getItem('user')).nickname} 님</a>
              : <a onClick={() => dispatch(isModalOpen(open))}><a>로그인</a></a> 
            }
          </div>

          {
            clickProfile ? <ProfileDropdown setClickProfile={setClickProfile}/> : <></>
          }
        </nav>
      </header>

      <Routes>
        <Route path="/" exact={true} element={<Calendar />}/>
        <Route path="/home" element={<Calendar />}/>
        <Route path="/chart" element={isLogin() ? <Chart /> : <RequireAuth />} />
        <Route path="/content" element={<Content />} />
        <Route path="/mypage" element={isLogin() ? <MyPage /> : <RequireAuth />} />
      </Routes>

      <div> {open ? <SignInModal /> : <></> } </div>
    </section>
  )
}
