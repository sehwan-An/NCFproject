import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
const ShopItem = () => {
  // 이름, 가격, 수량, 이미지, 제품아이디...
  return (
    <div>
    <container>
      <img src={`product`} alt="lorem picsum"/>
      <p>이름</p>
      <p>가격</p>
      <p>수량</p>
      <button
          type="submit"
          className="btn btn-primary"
      >
          구매하기
      </button>
    </container>
    ShopItem</div>
  )
}

export default ShopItem

































































































































