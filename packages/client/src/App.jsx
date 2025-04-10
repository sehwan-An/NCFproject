import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './routes/Home.jsx';
import SignUp from './routes/SignUp.jsx';
import HomeBody from './routes/HomeBody.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/' element={<HomeBody />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
