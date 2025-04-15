import React from 'react'

const ProductImageExample = ({text, photo}) => {
  return (
    <img src={`http://localhost:3000/${photo}`} alt={`${text}`} />
  )
}

export default ProductImageExample