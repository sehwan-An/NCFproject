import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

const ProductModify = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    productid: '',
    productname: '',
    productprice: '',
    productcolor: '',
    productsize: '',
  });

  let params = useParams();
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
        console.log(res);
        setFormData({
          productid: res.data.productid,
          productname: res.data.productname,
          productprice: res.data.productprice,
          productcolor: res.data.productcolor,
          productsize: res.data.productsize,
        });
      })
      .catch((res) => {
        console.log(res);
      });
    handleUpdate(params.id);
  }, []);

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      if (alert('수정하시겠습니까?')) {
        axios
          .put(
            `http://localhost:3000/api/products/${id}`,
            {
              productname: formData.productname,
              productprice: formData.productprice,
              productcolor: formData.productcolor,
              productsize: formData.productsize,
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.error(err.message));
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
                placeholder="제품코드"
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
                placeholder="제품명"
                value={formData.productname}
                onChange={handleChange}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomProdPrice">
              <Form.Label>제품 가격</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
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
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustomProdColor">
              <Form.Label>색상</Form.Label>
              <Form.Control
                type="text"
                name="productcolor"
                value={formData.productcolor}
                placeholder="색상"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomSize">
              <Form.Label>사이즈</Form.Label>
              <Form.Control
                type="text"
                name="productsize"
                value={formData.productsize}
                placeholder="사이즈"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div>
            <Button type="submit">완료</Button>
            <NavLink to="/manage/modify">
              <Button variant="danger">취소</Button>
            </NavLink>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default ProductModify;
