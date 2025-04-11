import React from 'react';
import { Container } from 'react-bootstrap';
import Logo from '../assets/ncf-logo.png';
import '../App.css';
import { NavLink } from 'react-router';
const SiteHeader = ({ userInfo, Logout }) => {
  return (
    <div>
      <Container className="header-container">
        <div className="d-flex justify-content-between py-3">
          <div>
            <img src={Logo} alt="logo" />
          </div>
          <div className="d-flex align-items-center gap-3">
            {userInfo ? (
              <>
                {userInfo.role ==
                  'customer'(
                    <>
                      <p>{userInfo.username}님 환영합니다.</p>
                      <NavLink to="#">
                        <p>마이페이지</p>
                      </NavLink>
                    </>,
                  )}
                {userInfo.role ==
                  'admin'(
                    <>
                      <p>{userInfo.username} 관리자님 환영합니다.</p>
                      <NavLink to="manage">
                        <p>관리페이지</p>
                      </NavLink>
                    </>,
                  )}
              </>
            ) : (
              <>
                <NavLink to="/signin">
                  <p>로그인</p>
                </NavLink>
                <NavLink to="/signup">
                  <p>회원가입</p>
                </NavLink>
              </>
            )}
          </div>
        </div>
        <nav className="d-flex justify-content-center gap-5 py-2">
          <NavLink to="/">홈으로</NavLink>
          <NavLink to="/shop">쇼핑</NavLink>
          <NavLink to="/aboutus">회사소개</NavLink>
          <NavLink to="/contact">고객문의</NavLink>
        </nav>
      </Container>
    </div>
  );
};

export default SiteHeader;
