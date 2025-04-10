import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container className='w-50 my-5'>
      <h2 className='text-center'>회원가입</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomId">
            <Form.Label>아이디</Form.Label>
            <Form.Control required type="text" placeholder="아이디" defaultValue="" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustomPwd">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control required type="password" placeholder="비밀번호" defaultValue="" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustomName">
            <Form.Label>이름</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" placeholder="이름" required />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomPhone">
            <Form.Label>연락처</Form.Label>
            <Form.Control type="text" placeholder="연락처" required />
            <Form.Control.Feedback type="invalid">
              정확한 연락처를 기입해주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex gap-3 justify-content-center">
            <Button variant='success' type="submit">가입</Button>
            <Button variant='danger'>취소</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default FormExample;
