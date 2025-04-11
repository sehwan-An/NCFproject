import React from 'react'

const ProductImageExample = ({index, text}) => {
  return (
    <img src={`https://picsum.photos/id/${index}/200/250`} alt={`${text}`} />
  )
}

export default ProductImageExample