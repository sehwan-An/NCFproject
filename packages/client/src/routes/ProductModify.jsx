import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, NavLink, useNavigate } from 'react-router';
import { Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

const ProductModify = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    productid: '',
    productname: '',
    productprice: '',
    productcolor: '',
    productsize: '',
    stock: '',
  });
  let token = Cookies.get('NCF');
  let params = useParams();
  let navigate = useNavigate();
  // console.log(params);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${params.id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        // console.log(res);
        setFormData({
          productid: res.data.productid,
          productname: res.data.productname,
          productprice: res.data.productprice,
          productcolor: res.data.productcolor,
          productsize: res.data.productsize,
          stock: res.data.stock,
        });
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    modifyProduct();
  };
  const modifyProduct = () => {
    try {
      if (confirm('수정하시겠습니까?')) {
        axios
          .put(`http://localhost:3000/api/product/${formData.productid}`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log(res);
            alert('수정이 완료되었습니다.');
            navigate('/manage/products');
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustomProdId">
              <Form.Label>제품 코드</Form.Label>
              <Form.Control
                required
                type="text"
                name="productid"
                value={formData.productid}
                disabled
                onChange={handleChange}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomProdName">
              <Form.Label>제품명</Form.Label>
              <Form.Control
                required
                type="text"
                name="productname"
                placeholder="제품명"
                value={formData.productname}
                onChange={handleChange}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomProdPrice">
              <Form.Label>제품 가격</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="String"
                  name="productprice"
                  placeholder="제품가격"
                  value={formData.productprice}
                  required
                  min={1}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomProdPrice">
              <Form.Label>재고</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  name="stock"
                  placeholder="제품가격"
                  value={formData.stock}
                  required
                  min={1}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustomProdColor">
              <Form.Label>색상</Form.Label>
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
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomSize">
              <Form.Label>사이즈</Form.Label>
              <Form.Select
                placeholder="크기"
                required
                value={formData.productsize}
                name="productsize"
                onChange={handleChange}
              >
                <option>--사이즈를 선택해 주세요--</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div>
            <Button type="submit">완료</Button>
            <NavLink to="/manage/products">
              <Button variant="danger">취소</Button>
            </NavLink>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default ProductModify;
