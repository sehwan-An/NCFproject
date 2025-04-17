import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router';
import ProductImageExample from '../components/ProductImageExample';
import { jwtDecode } from 'jwt-decode';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState([]);
  let navigate = useNavigate();
  
  useEffect(() => {
    let token = Cookies.get('NCF');
    if(!token) {
      console.log('토큰 없음. 비로그인 상태')
    } else {
      let user = jwtDecode(token);
      setToken(token)
      setUser(user)
    }
    try {
      axios
      .get('http://localhost:3000/api/products', {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    }catch(e) {
      console.log(e)
    }
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
        <Row className='row-cols-12'>
          {products == '' && <h2 className="text-center">상품을 준비중입니다.</h2>}
          {products !== '' &&
            products.map((prod, i) => (
              <Col key={i} className="text-center py-2">
                <NavLink to={`item/${prod.productid}`}>
                  <ProductImageExample photo={prod.photo} index={i} />
                </NavLink>
                <NavLink to={`item/${prod.productid}`}>
                  <p>{prod.productname}</p>
                </NavLink>
                <NavLink to={`item/${prod.productid}`}>
                  <p>{prod.productprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
                </NavLink>
                {user && user.role == 'customer' && (
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
                {!user.role && (
                  <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button className="btn btn-primary" onClick={() => orderProduct(prod)}>
                      구매하기
                    </button>
                  </div>
                )}
                {user && user.role == 'admin' && (
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
