import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const UserPage = () => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const token = Cookies.get('NCF');
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  const NaviCart = () => {
    navigate(`/usercart/${userInfo._id}`);
  };
  const NaviOrderHistory = () => {
    navigate(`/userorder/${userInfo._id}`);
  };
  return (
    <>
      <h2 className="text-center py-3">UserPage</h2>
      <div className="d-flex gap-3 align-items-center justify-content-center">
        <Button onClick={NaviOrderHistory}>주문내역</Button>
        <Button onClick={NaviCart}>장바구니</Button>
      </div>
    </>
  );
};

export default UserPage;
