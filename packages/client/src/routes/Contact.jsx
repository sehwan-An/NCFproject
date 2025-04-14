import React from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';



const Contact = () => {
  return (
    <Container>
      <h2>고객문의</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <label className="mb-3">문의 유형</label>
        
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Contact;
