import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import productBg from '../../assets/images/product-bg.png'
import Svg from '../../components/Svg'
import EditProduct from './EditProduct'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, count } = product

  const { deleteProduct, getProducts } = useProducts()

  const handleDeleteProduct = () => {
    deleteProduct(id).finally(() => {
      getProducts()
    })
  }

  return (
    <div
      className="product-item"
      style={{ backgroundImage: `url(${productBg})` }}
    >

      <EditProduct product={product} />

      <IconButton style={{ position: 'absolute' }} className="product-item__delete" onClick={handleDeleteProduct} type="button" sx={{ p: '6px' }}>
        <Svg id="trash" width={30} height={30} />
      </IconButton>

      <div className="product-item__info">
        <div>{name}</div>
        <div>{price} Р</div>
        <div className="product-item__info-count">
          <p>5шт</p>
          <p>{count}шт</p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
