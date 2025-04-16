import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const ProductImageExample = ({text, photo}) => {
  return (
    <img src={`http://localhost:3000/${photo}`} alt={`${text}`} className='img-size border' />
  )
}

export default ProductImageExample