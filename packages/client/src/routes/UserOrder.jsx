import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import ProductImageExample from '../components/ProductImageExample';
import '../App.css';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);

  let navigate = useNavigate();
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
          // console.log(res.data);
          setOrders(res.data);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, []);
  const handleNavigate = (e) => {
    navigate(`/user/${params.id}`);
  };
  const handleCancel = (id) => {
    try {
      if(confirm('선택한 상품의 주문을 취소하시겠습니까?')) {
        axios
        .delete(`http://localhost:3000/api/order/${id}`, {
          withCredentials: true,
          headers: {
            userid: `${params.id}`,
          },
        })
        .then((res) => {
          console.log(res);
          alert('주문 내역이 변경되었습니다.');
          location.reload();
        })
        .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <Container className='my-3'>
        <h2 className="text-center">주문내역</h2>
        <div className="text-end">
          <Button onClick={handleNavigate}>뒤로가기</Button>
        </div>
        <Row>
          {orders.map((order, i) => {
            return (
              <Col key={i} className="border border-success rounded-1 border-opacity-50 p-2 m-2">
                <div className="text-center">
                  <ProductImageExample photo={order.photo} text="photo" />
                </div>
                <div className="order-box">
                  <p>주문번호 : {order.ordernumber}</p>
                  <p>주문제품 : {order.orderproducts.name}</p>
                  <p>주문 수량 : {order.ordercount}</p>
                  <p>제품 사이즈 : {order.ordersize}</p>
                  <p>제품가 : {order.orderprice}</p>
                  <p>색상 : {order.ordercolor}</p>
                  <p>배송지 : {order.orderaddress}</p>
                  <p>주문일시 : {order.createdAt.split('T')[0]}</p>
                </div>
                <div>
                  <Button onClick={() => handleCancel(order._id)}>주문취소</Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default UserOrder;
