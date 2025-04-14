import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';

const UserCart = () => {
  const [carts, setCarts] = useState([]);

  let navigate = useNavigate();
  let params = useParams();
  let token = Cookies.get('NCF');
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/carts/${params.id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          userid: `${params.id}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setCarts(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log('장바구니 주문하기');
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:3000/api/cart/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          alert('장바구니에서 목록 제거 완료.')
          location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
            <Row className="row-cols-12">
              <Col>
                <h2 className="text-center">장바구니</h2>
              </Col>
            </Row>
            <Row className="row-cols-4 my-4">
              {carts.map((cart, i) => (
                <Col key={i}>
                  <div className="cart-box">
                    <p>제품명 : {cart.products.name}</p>
                    <p>
                      제품가 : {cart.products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                  </div>
                  <Button variant="danger" onClick={() => handleDelete(cart._id)}>
                    제거
                  </Button>
                </Col>
              ))}
            </Row>
            <Row className="text-center">
              <Col>
                <h4>장바구니 수 : {carts.length}</h4>
              </Col>
              <Col>
                <h4>총 가격 : </h4>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <Button type='submit'>주문하기</Button>
              </Col>
            </Row>
        </Form>
      </Container>
    </>
  );
};

export default UserCart;
