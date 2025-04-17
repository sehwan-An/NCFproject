import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, InputGroup, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import ProductImageExample from '../components/ProductImageExample';
import { useParams, useNavigate, NavLink } from 'react-router';

const ShopItem = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    productname: '',
    productid: '',
    productcolor: '',
    productsize: '',
    productprice: '',
    addressf: '',
    addressb: '',
    stock: 0,
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (!token) {
      alert('로그인 페이지로 이동합니다.');
      navigate('/signin');
    }
    if (formData.stock > 0 && token) {
      try {
        if (confirm('주문하시겠습니까?')) {
          axios
            .post(`http://localhost:3000/api/order/${params.id}`, formData, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              // console.log(res);
              alert('주문이 완료되었습니다.');
              navigate('/shop');
            });
        }
      } catch (e) {
        console.error(e.message);
      }
    }
  };

  return (
    <>
      <Container className="w-100 my-3">
        <Row className="align-items-center">
          <Col className="text-center">
            <ProductImageExample photo={formData.photo} text="photo" />
          </Col>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomName">
                  <Form.Label>제품명</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    disabled
                    name="productname"
                    placeholder="제품명"
                    value={formData.productname}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomStock">
                  <Form.Label>재고</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    disabled
                    name="stock"
                    // value={formData.stock > 0 ? formData.stock : 0}
                    value={typeof formData.stock === 'number' ? formData.stock : 0}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomColor">
                  <Form.Label>제품색상</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="productcolor"
                    disabled
                    placeholder="Last name"
                    value={formData.productcolor}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustomSize">
                  <Form.Label>제품사이즈</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Select
                      type="text"
                      placeholder="productsize"
                      name="productsize"
                      onChange={handleChange}
                      required
                      disabled
                      value={formData.productsize || ''}
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      사이즈를 선택해주세요.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <NavLink to={`/order/${params.id}`}>
                <Button variant="success">구매하러 가기</Button>
              </NavLink>
            </Form>
          </Col>
        </Row>
        <Row>
          <h2>대충 상세 설명이라는 뜻</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates mollitia quaerat
            saepe, obcaecati in sequi numquam eum corrupti officia officiis aliquam unde totam atque
            delectus amet adipisci. Consequatur, sunt cumque!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quisquam odio vero
            reprehenderit enim optio sunt omnis, pariatur minima molestiae aut, tempore fuga rem
            iusto! Nesciunt, sunt saepe. Impedit, rerum?
          </p>
        </Row>
      </Container>
    </>
  );
};

export default ShopItem;
