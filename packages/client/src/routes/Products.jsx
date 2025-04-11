import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const isProduct = console.log('재고 있음');
  return (
    <>
      <h2 className="text-center">상품관리</h2>
      <div className="text-center my-2">
        {isProduct ? '재고있음' : '상품 재고 없음'}
      </div>
      <div className="text-center">
        <Link to="/addproduct">
          <Button>상품등록</Button>
        </Link>
      </div>
    </>
  );
};

export default Products;
