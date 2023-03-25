import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { Typography } from '@mui/material'

import { Product } from '../../contexts/products/types'
import { formatPrice } from '../../helpers/formatters/formatPrice'
import ProductLayoutSlider from './ProductLayoutSlider'
import './styles.scss'

type Props = {
  product: Product
  headerContent?: ReactElement
  footerContent?: ReactElement
  disabled?: boolean
}

const ProductLayout: React.FC<Props> = ({ product, headerContent, footerContent, disabled = false }) => {
  const { name, price, img_ids, id } = product

  const navigate = useNavigate()

  const goToProduct = () => {
    if (disabled) return
    navigate(`/products/${id}`)
  }

  return (
    <div className="product-layout">
      <ProductLayoutSlider
        ids={img_ids}
        onClick={goToProduct}
      />

      <div className="product-layout-header">
        <Typography className="product-layout__name" component="h6" fontWeight={500}>
          {name}
        </Typography>
        {headerContent}
      </div>

      <Typography component="h6" variant="h5" fontWeight={600}>
        {formatPrice(price)}
      </Typography>

      <div className="product-layout-footer">{footerContent}</div>
    </div>
  )
}

export default ProductLayout
