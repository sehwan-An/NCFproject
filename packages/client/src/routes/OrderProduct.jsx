import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';

const OrderProduct = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    productname: '',
    productid: '',
    productcolor: '',
    productsize: '',
    productprice: '',
    addressf: '',
    addressb: '',
  });

  let params = useParams();
  let token = Cookies.get('NCF');
  let navigate = useNavigate();
  
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/products/${params.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          //   console.log(res.data);
          setFormData(res.data);
        });
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    try {
      axios
        .post(`http://localhost:3000/api/cart/${params.id}`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          alert('주문이 완료되었습니다.');
          navigate('/shop')
        });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <Container className="w-50">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>제품명</Form.Label>
              <Form.Control
                required
                type="text"
                disabled
                name="productname"
                placeholder="제품명"
                defaultValue={formData.productname}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>제품색상</Form.Label>
              <Form.Control
                required
                type="text"
                name="productcolor"
                disabled
                placeholder="Last name"
                defaultValue={formData.productcolor}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomproductsize">
              <Form.Label>제품사이즈</Form.Label>
              <InputGroup hasValidation>
                <Form.Select
                  type="text"
                  placeholder="productsize"
                  name="productsize"
                  onChange={handleChange}
                  required
                  defaultValue={formData.productsize}
                >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">사이즈를 선택해주세요.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>주소</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={formData.addressf}
                placeholder="주소"
                name='addressf'
                required
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label>상세주소</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="addressb"
                value={formData.addressb}
                placeholder="상세주소"
                required
              />
              <Form.Control.Feedback type="invalid">
                정확한 주소지를 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">주문확인</Button>
        </Form>
      </Container>
    </>
  );
};

export default OrderProduct;
