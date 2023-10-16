import LoginModal from './loginModal';
import { isModalOpen } from '../../actions/loginAction';
import { useSelector, useDispatch } from 'react-redux';
import './navigation.css';

export default function Navigation() {
  const open = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();

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
              <a href="#none" onClick={() => dispatch(isModalOpen(open.state))}>로그인</a>
            </div>
          </nav>
        </header>
        <div>
          {
            open.state ? <LoginModal /> : <></>
          }
        </div>
      </div>
    </>
  )
}