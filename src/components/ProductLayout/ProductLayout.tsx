import React, { ReactElement } from 'react'
import { Carousel } from 'react-responsive-carousel'
import './styles.scss'
import { Product } from '../../contexts/products/types'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useNavigate } from 'react-router-dom'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImgSrc from '../../assets/images/empty-product-image.svg'
import ListWithTitle from '../ListWithTitle/ListWithTitle'
import { priceFormat } from '../../helpers/priceFormat'
import { Typography } from '@mui/material'

type Props = {
  product: Product
  headerContent?: ReactElement
  footerContent?: ReactElement
  disabled?: boolean
}

const ProductLayout: React.FC<Props> = ({ product, headerContent, footerContent, disabled = false }) => {
  const { name, price, count, img_ids, id } = product

  const navigate = useNavigate()

  const goToProduct = () => {
    if (disabled) return
    navigate(`/product/${id}`)
  }

  return (
    <div className="product-layout">
      <div className="product-layout-header">
        <Typography variant="h5" component="h4" fontWeight={500} textAlign="center">
          {name}
        </Typography>
        {headerContent}
      </div>

      {img_ids?.length ? (
        <Carousel onClickItem={goToProduct} showStatus={false} className="product-layout-slider" showThumbs={false} showArrows={true}>
          {img_ids?.map(id => (
            <div className="product-layout-slide" key={id}>
              <img className="product-layout-slide__img" src={imgSrc(id)} alt=""/>
            </div>
          ))}
        </Carousel>
      ) : (
        <div onClick={goToProduct} className="product-layout-slide">
          <img className="product-layout-slide__img" src={emptyImgSrc} alt=""/>
        </div>
      )}

      <ListWithTitle
        className="product-layout-info"
        options={[
          {
            title: 'В наличии',
            text: count,
          },
          {
            title: 'Цена',
            text: priceFormat(price),
          },
        ]}
      />

      <div className="product-layout-footer">{footerContent}</div>
    </div>
  )
}

export default ProductLayout
