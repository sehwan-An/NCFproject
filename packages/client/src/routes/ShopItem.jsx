import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import ProductImageExample from '../components/ProductImageExample';
import { useParams } from 'react-router';

const ShopItem = () => {
  let params = useParams();

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div>
              <ProductImageExample />
            </div>
            <div>
              <p>이름</p>
              <p>가격</p>
              <p>수량</p>
            </div>
            <button type="submit" className="btn btn-primary">
              구매하기
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopItem;
