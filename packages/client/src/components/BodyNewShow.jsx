import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../App.css';
import ProductImageExample from './ProductImageExample';
import { NavLink } from 'react-router';
const BodyNewShow = ({ products }) => {
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
      <Row className="row-cols-12 my-3 align-items-center">
        {products &&
          products.map((prod, i) => {
            return (
              <Col md={3} className="posi-rel" key={i}>
                <NavLink to={`shop/item/${prod.productid}`}>
                  <ProductImageExample photo={prod.photo} text='photo' />
                </NavLink>
                <span className="new-items posi-ab">New!</span>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default BodyNewShow;
