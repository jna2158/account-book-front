import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Content } from '../content/content';
import { Chart } from '../chart/chart';
import { Calendar } from '../mainpage/calendar';
import ProfileDropdown from './profile-dropdown/profileDropdown';
import MyPage from '../mypage/mypage';
import SignInModal from '../signin/signInModal';
import logo from "../../source/account-book-logo.png";
import './navigation.css';

import { isModalOpen } from '../../actions/loginAction';
import { useSelector, useDispatch } from 'react-redux';

export default function Navigation() {
  const open = useSelector(state => state.loginReducer.state);
  const [clickProfile, setClickProfile] = useState(false);
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const isLogin = () => {
    return localStorage.getItem("ACCESS_TOKEN");
  }

  useEffect(() => {
    // const handleOutsideClick = (event) => {
    //   if (profileRef.current && !profileRef.current.contains(event.target) && event.target !== <li>마이페이지</li>) {
    //     setClickProfile(false);
    //   }
    // };

    // document.addEventListener('mousedown', handleOutsideClick);

    // return () => {
    //   document.removeEventListener('mousedown', handleOutsideClick);
    // };
  }, [profileRef]);

  return (
    <section>
      <header>
        <nav>
          <div className="logo">
            <NavLink to="/home" className="link_selected"><a onClick={() => setClickProfile(false)}><img className="account-book-logo" src={logo}></img></a></NavLink>
          </div>

          <div className="gnb">
            <NavLink to="/home" className="link_selected"><a onClick={() => setClickProfile(false)}>조회</a></NavLink>
            <NavLink to="/chart" className="link_selected"><a onClick={() => setClickProfile(false)}>차트 보기</a></NavLink>
            <NavLink to="/content" className="link_selected"><a onClick={() => setClickProfile(false)}>소비 습관</a></NavLink>
          </div>

          <div className="login">
            {
              isLogin()
              ? <a ref={profileRef} onClick={() => setClickProfile(!clickProfile)}>{JSON.parse(localStorage.getItem('user')).nickname} 님</a>
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
        <Route path="/chart" element={<Chart />} />
        <Route path="/content" element={<Content />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>

      <div> {open ? <SignInModal /> : <></> } </div>
    </section>
  )
}
