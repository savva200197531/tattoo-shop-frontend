import React, { ReactElement } from 'react'
import { Carousel } from 'react-responsive-carousel'
import './styles.scss'
import { Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type Props = {
  product: Product
  headerContent?: ReactElement
  footerContent?: ReactElement
}

const ProductLayout: React.FC<Props> = ({ product, headerContent, footerContent }) => {
  const { name, price, count, img_ids } = product

  const { productImgSrc } = useProducts()

  return (
    <div className="product-layout">
      <div className="product-header">{headerContent}</div>

      <Carousel className="product-slider" showThumbs={false} showArrows={true}>
        {img_ids.map(id => <img key={id} src={productImgSrc(id)} alt=""/>)}
      </Carousel>

      <div className="product-info">
        <div>{name}</div>
        <div>{price} Р</div>
        <div className="product-info__count">
          <p>5шт</p>
          <p>{count}шт</p>
        </div>
      </div>

      <div className="product-footer">{footerContent}</div>
    </div>
  )
}

export default ProductLayout
