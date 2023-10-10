import LoginModal from './loginModal';
import './navigation.css';
import { useState } from 'react';

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="container">
        <header>
          <nav>
            <div className="logo">
              <a href="#none"><img src="" alt="" />로고</a>
            </div>
            
            {/* 로그인 */}
            <div className="login">
              <a href="#none" onClick={openModal}>로그인</a>
            </div>
          </nav>
        </header>
        <div>
          {
            isModalOpen ? <LoginModal /> : <></>
          }
        </div>
      </div>
    </>
  )
}