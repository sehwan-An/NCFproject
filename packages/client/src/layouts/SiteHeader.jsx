import React from 'react';
import { Container } from 'react-bootstrap';
import Logo from '../assets/ncf-logo.png';
import '../App.css';
import { NavLink } from 'react-router';
const SiteHeader = () => {
  return (
    <div>
      <Container className="header-container d-flex justify-content-between py-3">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div className="d-flex align-items-center gap-3">
          <NavLink to="/signin">
            <p>로그인</p>
          </NavLink>
          <NavLink to="/signup">
            <p>회원가입</p>
          </NavLink>
        </div>
      </Container>
      <nav className="d-flex justify-content-center gap-5">
        <NavLink to="/">홈으로</NavLink>
        <NavLink to='/shop'>쇼핑</NavLink>
        <NavLink to="/aboutus">회사소개</NavLink>
        <NavLink to="/contact">고객문의</NavLink>
      </nav>
    </div>
  );
};

export default SiteHeader;
