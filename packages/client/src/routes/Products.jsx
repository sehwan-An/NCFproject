import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductImageExample from '../components/ProductImageExample';

const Products = () => {
  const [products, setProducts] = useState(null);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get('NCF');

    token ? setIsToken(true) : setIsToken(false);

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

  const handleDelete = (e) => {
    console.log(e.target)
  }
  const handleModify = (e) => {
    console.log(e.target)
  }

  return (
    <>
      <h2 className="text-center">상품관리</h2>
      <Container className="text-center my-2 gap-3">
        <Row className="row-cols-12">
          {products &&
            products.map((prod, i) => (
              <Col className="col-3" key={i}>
                <p>{prod.productname}</p>
                <ProductImageExample text={prod.productname} index={i} />
                <Col className='d-flex justify-content-center  gap-3 my-2'>
                  <Button onClick={handleModify}>수정</Button>
                  <Button onClick={handleDelete}>삭제</Button>
                </Col>
              </Col>
            ))}
        </Row>
      </Container>
      <div className="text-center">
        <Link to="/addproduct">
          <Button>상품등록</Button>
        </Link>
      </div>
    </>
  );
};

export default Products;
