import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Shop = () => {
  return (
    <Container>
      <Row>
        <Col>
            <img src="https://picsum.photos/200/300" alt="lorem picsum"/>
            <p>이름</p>
            <p>가격</p>
            <button
                type="submit"
                class="btn btn-primary"
            >
                주문하기
            </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
