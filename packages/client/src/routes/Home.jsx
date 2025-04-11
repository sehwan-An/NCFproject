import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import SiteHeader from '../layouts/SiteHeader';
import SiteFooter from '../layouts/SiteFooter';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const token = Cookies.get('NCF');
    try {
      if(token) {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken)
        // console.log(decodedToken)
      }
    } catch(e) {
      console.log(e)
    }
  }, [])
  const Logout = () => {
    if(confirm('로그아웃 하시겠습니까?')) {
      Cookies.remove('NCF');
      location.href = '/'
    }
  }
  return (
    <div>
      <SiteHeader userInfo={userInfo} Logout={Logout} />
      <Outlet></Outlet>
      <SiteFooter />
    </div>
  );
};

export default Home;
