import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductImageExample from '../components/ProductImageExample';

const Products = () => {
  const [products, setProducts] = useState(null);
  const [isToken, setIsToken] = useState(false);
  let params = useParams();
  let navigate = useNavigate();
  const token = Cookies.get('NCF');
  
  useEffect(() => {

    token ? setIsToken(true) : setIsToken(false);

    axios
      .get('http://localhost:3000/api/products', {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleModify = (id) => {
    navigate(`/manage/products/${id}`)
  }
  const handleDelete = (id) => {
    try{
      if(confirm('등록된 제품을 삭제하시겠습니까?')) {
        axios.delete(`http://localhost:3000/api/product/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          console.log(res)
          alert('삭제 완료.')
        }).catch((err) => {
          console.error(err.message)
        })
      }
    } catch(e) {
      console.log(e)
    }
  };

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
                <div className="d-flex justify-content-center  gap-3 my-2">
                    <Button onClick={() => handleModify(prod.productid)}>수정</Button>
                  <Button variant='danger' onClick={() => handleDelete(prod.productid)}>삭제</Button>
                </div>
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
