import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { NavLink } from 'react-router';

function SignIn() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    userid: '',
    userpwd: '',
  });
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
    axios
      .post('http://localhost:3000/users/signin', formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          alert('로그인 성공');
          location.href = '/';
        } else if (response.status === 400) {
          alert('아이디 또는 비밀번호를 확인하세요.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="w-50 my-5 mx-auto">
      <h2 className="text-center">로그인</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
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
        <Row>
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
        <Row className="my-3">
          <Col className="d-flex gap-3 justify-content-center">
            <Button variant="success" type="submit">
              로그인
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

export default SignIn;
