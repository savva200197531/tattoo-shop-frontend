import React, { ReactElement } from 'react'
import { Carousel } from 'react-responsive-carousel'
import './styles.scss'
import { Product } from '../../contexts/products/types'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useNavigate } from 'react-router-dom'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImgSrc from '../../assets/images/empty-product-image.svg'

type Props = {
  product: Product
  headerContent?: ReactElement
  footerContent?: ReactElement
}

const ProductLayout: React.FC<Props> = ({ product, headerContent, footerContent }) => {
  const { name, price, count, img_ids, id } = product

  const navigate = useNavigate()

  return (
    <div className="product-layout">
      <div className="product-header">{headerContent}</div>

      {img_ids?.length ? (
        <Carousel onClickItem={() => navigate(`/products/${id}`)} showStatus={false} className="product-slider" showThumbs={false} showArrows={true}>
          {img_ids?.map(id => (
            <div className="product-slide" key={id}>
              <img className="product-slide__img" src={imgSrc(id)} alt=""/>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="product-slide">
          <img className="product-slide__img" src={emptyImgSrc} alt=""/>
        </div>
      )}

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
