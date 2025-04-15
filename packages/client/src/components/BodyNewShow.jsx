import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../App.css';
import ProductImageExample from './ProductImageExample';
const BodyNewShow = ({ prods }) => {
    const [products, setProducts] = useState({
        path: '',
    });
    setProducts(prods)
  return (
    <>
      {!products && <h2>이미지 공사중...</h2>}
      {products && (
        <Row className="text-center">
          <Col md={12}>
            <h2>New Arrivals</h2>
          </Col>
          <Col md={12}>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, excepturi.</p>
          </Col>
        </Row>
      )}
      <Row className="my-3 gap-5 d-flex align-items-center justify-content-around">
        {/* {products &&
          products.map((prod, i) => {
            return (
              <Col xs={3} sm={3} md={2} className="posi-rel" key={i}>
                <ProductImageExample path={prod.path} />
                <span className="new-items posi-ab">New!</span>
              </Col>
            );
          })} */}
      </Row>
    </>
  );
};

export default BodyNewShow;
