import React from 'react'
import { Container } from 'react-bootstrap'
import Mansimge from '../assets/aboutus/MensShop.png'
import Wonesimg from '../assets/aboutus/WoensShop.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'





function AboutImage() {
  return (
    
    <>
      <Container className='d-flex gap-3 justify-content-center align-items-center'>
        <img src={Mansimge} alt="MensShopimg.png" className='about-img-size' />
        <img src={Wonesimg} alt="WoensShopimg.png" className='about-img-size' />
        
      </Container>
    </>


    
  )
}

export default AboutImage