import React from 'react'

type Props = {
  src: string
}

const ProductLayoutSlide: React.FC<Props> = ({ src }) => {
  return (
    <div className="product-layout-slide">
      <img className="product-layout-slide__img" src={src} alt="product-img"/>
    </div>
  )
}

export default ProductLayoutSlide
