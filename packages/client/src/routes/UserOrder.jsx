import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router';
import ProductImageExample from '../components/ProductImageExample';
import '../App.css'

const UserOrder = () => {
  const [orders, setOrders] = useState([]);

  let params = useParams();
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/order/${params.id}`, {
          withCredentials: true,
          headers: {
            userid: `${params.id}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      <Container>
        <h2 className="text-center">주문내역</h2>
        <Row>
          {orders.map((order, i) => {
            return (
              <>
                <Col key={i}>
                  <div>
                    <ProductImageExample photo={order.photo} text='photo' />
                  </div>
                  <div className='order-box'>
                    <p>주문 고객 : {order.orderuser}</p>
                    <p>주문번호 : {order.ordernumber}</p>
                    <p>주문제품 : {order.orderproducts}</p>
                    <p>주문 수량 : {order.ordercount}</p>
                    <p>제품 사이즈 : {order.ordersize}</p>
                    <p>제품가 : {order.orderprice}</p>
                    <p>색상 : {order.ordercolor}</p>
                    <p>배송지 : {order.orderaddress}</p>
                    <p>주문일시 : {order.createdAt.split('T')[0]}</p>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default UserOrder;
