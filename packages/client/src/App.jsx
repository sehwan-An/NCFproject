import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './routes/Home.jsx';
import SignUp from './routes/SignUp.jsx';
import Shop from './routes/Shop.jsx';
import Contact from './routes/contact.jsx';
import HomeBody from './routes/HomeBody.jsx';
import SignIn from './routes/SignIn.jsx';
import AboutUs from './routes/AboutUs.jsx';
import ShopItem from './routes/ShopItem.jsx';
import Management from './routes/Management.jsx';
import AddProduct from './routes/AddProduct.jsx';
import Products from './routes/Products.jsx';

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
            <Route path="products" element={<Products />}></Route>
          </Route>
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
