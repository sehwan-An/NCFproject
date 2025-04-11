import React, { useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import {NavLink} from 'react-router'
const Shop = () => {
  useEffect(() => {
    
  },[])
  return (
    <Container>
      <Row>
        <Col>
            <img src="https://picsum.photos/200/300" alt="lorem picsum"/>
            <p>이름</p>
            <p>가격</p>
            {/* <NavLink to={`shop/${}`}> */}
              <button
                  type="submit"
                  className="btn btn-primary"
              >
                  구매하기
              </button>
            {/* </NavLink> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
