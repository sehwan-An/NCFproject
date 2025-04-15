import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router';
import ProductImageExample from '../components/ProductImageExample';
import { jwtDecode } from 'jwt-decode';

const Shop = () => {
  const [products, setProducts] = useState(null);
  let navigate = useNavigate();
  let token = Cookies.get('NCF');
  let user = jwtDecode(token);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products', {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function orderProduct(p) {
    if (!token) {
      alert('로그인이 필요합니다. 로그인창으로 이동합니다.');
      navigate('/signin');
    } else {
      navigate(`/order/${p.productid}`);
    }
  }
  function cartProduct(product) {
    try {
      if (confirm('장바구니에 담으시겠습니까?')) {
        axios
          .post('http://localhost:3000/api/cart', product, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log(res)
            alert('저장 성공!');
          });
      }
    } catch (e) {
      console.error(e.message);
    }
  }
  function handleModify(prod) {
    navigate(`/manage/products/${prod.productid}`);
  }
  return (
    <Container className="my-4">
      <Row>
        {products == '' && <h2 className="text-center">상품을 준비중입니다.</h2>}
        {products !== '' &&
          products.map((prod, i) => (
            <Col key={i} className="text-center">
              <NavLink to="item">
                <ProductImageExample photo={prod.photo} index={i} />
              </NavLink>
              <NavLink to="item">
                <p>{prod.productname}</p>
              </NavLink>
              <NavLink to="item">
                <p>{prod.productprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
              </NavLink>
              {user.role == 'customer' && (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <button className="btn btn-primary" onClick={() => orderProduct(prod)}>
                    구매하기
                  </button>
                  <NavLink>
                    <button onClick={() => cartProduct(prod)} className="btn btn-secondary">
                      장바구니
                    </button>
                  </NavLink>
                </div>
              )}
              {user.role == 'admin' && (
                <div>
                  <button onClick={() => handleModify(prod)} className="btn btn-primary">
                    수정하기
                  </button>
                </div>
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Shop;
