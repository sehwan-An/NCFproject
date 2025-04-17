import React from 'react';
import { Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Logo from '../assets/header-logo.png';
import '../App.css';
import { NavLink } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
const SiteHeader = ({ userInfo, Logout }) => {
  function handleSubmit() {
    console.log('검색어 입력, 검색 시도');
  }
  return (
    <>
      <Container className="py-2">
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={handleSubmit} className="d-flex gap-2 align-items-center">
              <Form.Group controlId="validationCustomUsername" className='flex-5'>
                <InputGroup hasValidation>
                  <Form.Control
                    type="search"
                    placeholder="검색어 입력"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
              <button type="submit" className="search-btn flex-1">
                <i className="bi bi-search"></i>
              </button>
            </Form>
          </Col>
          <Col className="text-end">
            <div className="user-navi-bar">
              {userInfo ? (
                <div className="d-flex align-items-center gap-3">
                  {userInfo.role == 'customer' ? (
                    <>
                      <p>{userInfo.name}님 환영합니다.</p>
                      <Button variant="danger" onClick={Logout}>
                        로그아웃
                      </Button>
                      <NavLink to={`user/${userInfo._id}`}>
                        <p>마이페이지</p>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <p>{userInfo.name}님 환영합니다.</p>
                      <Button variant="danger" onClick={Logout}>
                        로그아웃
                      </Button>
                      <NavLink to="manage">
                        <p>관리페이지</p>
                      </NavLink>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <NavLink to="/signin">
                    <Button className="login-btn">로그인</Button>
                  </NavLink>{' '}
                  <NavLink to="/signup">회원가입</NavLink>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="header-container">
        <Container>
          <Row className="align-items-center py-3">
            <Col className="posi-rel">
              <NavLink to="/">
                <img src={Logo} alt="logo" className="logo-size" />
              </NavLink>
            </Col>
            <Col className="d-flex justify-content-center gap-5 py-2 posi-rel">
              <NavLink to="/">홈으로</NavLink>
              <NavLink to="/shop">쇼핑</NavLink>
              <NavLink to="/aboutus">회사소개</NavLink>
              <NavLink to="/contact">고객문의</NavLink>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SiteHeader;
