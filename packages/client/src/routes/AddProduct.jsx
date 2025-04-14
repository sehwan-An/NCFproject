import { useState } from 'react';
import { Row, Col, Form, InputGroup, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router';
import axios from 'axios';

function AddProduct() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    productname: '',
    productprice: '',
    productcolor: '',
    productsize: '',
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
      .post('http://localhost:3000/api/product', formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="w-50 my-4">
      <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomName">
            <Form.Label>제품명</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="제품명"
              value={formData.productname}
              name="productname"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustomPrice">
            <Form.Label>가격</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="가격"
              min="1"
              value={formData.productprice}
              name="productprice"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustomColor">
            <Form.Label>색상</Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                aria-label="product-color"
                placeholder="색상"
                required
                value={formData.productcolor}
                name="productcolor"
                onChange={handleChange}
              >
                <option>--색상을 선택해 주세요--</option>
                <option value="화이트">화이트</option>
                <option value="블랙">블랙</option>
                <option value="베이지">베이지</option>
                <option value="회색">회색</option>
                <option value="코발트블루">코발트블루</option>
                <option value="옐로그린">옐로그린</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">색상을 선택해 주세요</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomSize">
            <Form.Label>크기</Form.Label>
            <Form.Select
              placeholder="크기"
              required
              value={formData.productsize}
              name="productsize"
              onChange={handleChange}
            >
              <option>--사이즈를 선택해 주세요--</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">사이즈를 입력해주세요</Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group as={Col} md="12" controlId="validationCustom04">
              <Form.Label>수량</Form.Label>
              <Form.Control type="text" placeholder="수량" required />
              <Form.Control.Feedback type="invalid">
                수량을 입력해주세요
              </Form.Control.Feedback>
            </Form.Group> */}
          {/* <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>이미지</Form.Label>
              <Form.Control type="file" placeholder="이미지" />
            </Form.Group> */}
        </Row>
        <div className="d-flex gap-3 justify-content-center">
          <Button type="submit">등록</Button>
          <NavLink to="/">
            <Button>취소</Button>
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}

export default AddProduct;
