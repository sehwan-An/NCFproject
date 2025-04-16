import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        //   console.log(res.data);
          setOrders(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  const cancelOrder = (id) => {
    try {
      if (confirm('주문을 취소할까요?')) {
        axios
          .delete(`http://localhost:3000/api/manage/order/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res);
            alert('주문을 취소했습니다.')
            location.reload();
          })
          .catch((res) => {
            console.log(res);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

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
                    <p>
                      제품가 :{' '}
                      {order.orderproducts.productprice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                    <p>색상 : {order.orderproducts.productcolor}</p>
                    <p>배송지 : {order.orderaddress}</p>
                    <p>주문일시 : {order.createdAt.split('T')[0]}</p>
                  </div>
                  <div className="py-1 text-center">
                    <Button variant="danger" onClick={() => cancelOrder(order.ordernumber)}>
                      주문취소
                    </Button>
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
