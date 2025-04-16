import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './routes/Home.jsx';
import SignUp from './routes/SignUp.jsx';
import Shop from './routes/Shop.jsx';
import Contact from './routes/Contact.jsx';
import HomeBody from './routes/HomeBody.jsx';
import SignIn from './routes/SignIn.jsx';
import AboutUs from './routes/AboutUs.jsx';
import ShopItem from './routes/ShopItem.jsx';
import Management from './routes/Management.jsx';
import AddProduct from './routes/AddProduct.jsx';
import Products from './routes/Products.jsx';
import ProductModify from './routes/ProductModify.jsx';
import UserCare from './routes/UserCare.jsx';
import OrderCare from './routes/OrderCare.jsx';
import UserCart from './routes/UserCart.jsx';
import UserOrder from './routes/UserOrder.jsx';
import OrderProduct from './routes/OrderProduct.jsx';
import AdminAnswer from './routes/AdminAnswer.jsx';
import UserPage from './routes/UserPage.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeBody />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="shop" element={<Shop />}>
            <Route path="item" element={<ShopItem />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="manage" element={<Management />}>
            <Route path="usercare" element={<UserCare />} />
            <Route path="products" element={<Products />} />
            <Route path="ordercare" element={<OrderCare />} />
            <Route path="products/:id" element={<ProductModify />} />
          </Route>
            <Route path='adminanswer/:id' element={<AdminAnswer />}/>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="order/:id" element={<OrderProduct />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="usercart/:id" element={<UserCart />} />
          <Route path="userorder/:id" element={<UserOrder />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
