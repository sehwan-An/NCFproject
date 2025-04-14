import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router';
import ProductImageExample from '../components/ProductImageExample';

const Shop = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="my-4">
      <Row>
        {products &&
          products.map((prod, i) => (
            <Col>
              <ProductImageExample index={i}/>
              <p>{prod.productname}</p>
              <p>{prod.productprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        <NavLink to={`shop/${prod.productid}`}>
          <button type="submit" className="btn btn-primary">
            구매하기
          </button>
        </NavLink>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Shop;
