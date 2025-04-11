import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then((res) => {
      console.log(res);
      setProducts(res);
    });
    console.log(products);
  }, [products]);
  return (
    <>
      <h2 className="text-center">상품관리</h2>
      <div className="text-center my-2">
        {products &&
          products.map((product, i) => {
            <div key={i}>
              <p>제품명 : {product.productname}</p>
              <p>
                가격 : <del>{product.productprice}</del>
              </p>
              <p>할인가 : {product.productprice * (1 - 0.1)}</p>
              <p>할인율 : 10%</p>
              <p>색상 : {product.productcolor}</p>
              <p>사이즈 : {product.productsize}</p>
            </div>;
          })}
        {!products && <h2>상품재고 없음</h2>}
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
