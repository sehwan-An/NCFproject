import React from 'react';
import { Container, Button } from 'react-bootstrap';
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
                {userInfo.role == 'customer' ? (
                  <>
                    <p>{userInfo.name}님 환영합니다.</p>
                    <Button onClick={Logout}>로그아웃</Button>
                    <NavLink to={`user/${userInfo._id}`}>
                      <p>마이페이지</p>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <p>{userInfo.name}님 환영합니다.</p>
                    <Button onClick={Logout}>로그아웃</Button>
                    <NavLink to="manage">
                      <p>관리페이지</p>
                    </NavLink>
                  </>
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
