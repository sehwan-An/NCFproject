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
  const isProduct = products.length > 0;
  return (
    <>
      <h2 className="text-center">상품관리</h2>
      <ul className="text-center my-2">
        {isProduct
          ? products.map((product, i) => {
              <li key={product.id}>
                <p>제품명 : {product.name}</p>
                <p>
                  가격 : <del>{product.price}</del>
                </p>
                <p>할인가 : {product.price * (1 - 0.1)}</p>
                <p>할인율 : 10%</p>
                <p>색상 : {product.color}</p>
                <p>사이즈 : {product.size}</p>
              </li>;
            })
          : '상품 재고 없음'}
      </ul>
      <div className="text-center">
        <Link to="/addproduct">
          <Button>상품등록</Button>
        </Link>
      </div>
    </>
  );
};

export default Products;
