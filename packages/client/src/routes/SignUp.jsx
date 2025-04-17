import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';

function SignUp() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    userid: '',
    userpwd: '',
    username: '',
    userphone: '',
    email: '',
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    console.log(formData);
    axios
      .post('http://localhost:3000/users', formData, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        alert('메인화면으로 돌아갑니다.');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="w-50 my-5 mx-auto">
      <h2 className="text-center">회원가입</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="border p-3 rounded-3"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomId">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              required
              type="text"
              name="userid"
              value={formData.userid}
              placeholder="아이디"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomPwd">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              required
              type="password"
              value={formData.userpwd}
              name="userpwd"
              placeholder="비밀번호"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomName">
            <Form.Label>이름</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                placeholder="이름"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomPhone">
            <Form.Label>연락처</Form.Label>
            <Form.Control
              type="text"
              name="userphone"
              value={formData.userphone}
              placeholder="연락처"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              정확한 연락처를 기입해주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              placeholder="이메일"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              정확한 이메일 기입해주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex gap-3 justify-content-center">
            <Button variant="success" type="submit">
              가입
            </Button>
            <NavLink to="/">
              <Button variant="danger">취소</Button>
            </NavLink>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SignUp;
