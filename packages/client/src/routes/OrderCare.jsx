import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import '../App.css';

const OrderCare = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:3000/api/order', {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  return (
    <>
      <Container>
        <Row className="row-cols-12">
          {orders.length > 0 &&
            orders.map((order, i) => {
              return (
                <Col md={4} key={i}>
                  <div className="order-box border rounded-2 p-2 my-2">
                    <p>주문 고객 : {order.orderuser.username}</p>
                    <p>주문번호 : {order.ordernumber}</p>
                    <p>주문제품 : {order.orderproducts.productname}</p>
                    <p>주문 수량 : {order.ordercount}</p>
                    <p>재고(주문수량제외) : {order.orderproducts.stock}</p>
                    <p>제품 사이즈 : {order.orderproducts.productsize}</p>
                    <p>제품가 : {order.orderproducts.productprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    <p>색상 : {order.orderproducts.productcolor}</p>
                    <p>배송지 : {order.orderaddress}</p>
                    <p>주문일시 : {order.createdAt.split('T')[0]}</p>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default OrderCare;
