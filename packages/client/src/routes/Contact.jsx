import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function Contact() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    contact_title: '',
    contact_content: '',
    contact_type: '',
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    const token = Cookies.get('NCF');
    if (!token) {
      alert('로그인후 이용해주세요!');
      navigate('/signin');
    }
    setValidated(true);
    
    try {
      if (token) {
        axios
          .post('http://localhost:3000/users/contact', formData, {
            withCredentials: true,
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 201) {
              location.href = '/';
            }
          })
          .catch((err) => console.error(err.message));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <h2>고객문의</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="contact_title" />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <InputGroup>
              <Form.Select
                placeholder="문의유형"
                required
                name="contact_type"
                value={formData.contact_type}
                onChange={handleChange}
              >
                <option value="">문의유형</option>
                <option value="제품 문의">제품 문의</option>
                <option value="반품">반품</option>
                <option value="교환">교환</option>
                <option value="환불">환불</option>
                <option value="기타">기타</option>
              </Form.Select>
            </InputGroup>
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" onChange={handleChange} rows={5} name="contact_content" />
        </Form.Group>

        <Form.Group className="mb-3 d-none">
          <label className="visually-hidden">Hidden input label</label>
          <input type="text" className="form-control" name="contact_status" id="contact_status" />
        </Form.Group>

        <button type="submit" className="flex-end">
          문의하기
        </button>
      </Form>
    </Container>
  );
}

export default Contact;
