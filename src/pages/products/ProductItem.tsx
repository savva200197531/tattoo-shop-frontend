import React, { useState } from 'react'

import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import { useCart } from '../../contexts/cart/CartContext'
import productBg from '../../assets/images/product-bg.png'
import CartCounter from '../../components/CartCounter/CartCounter'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, count } = product

  const [loading, setLoading] = useState<boolean>(false)

  const { deleteProduct, getProducts } = useProducts()
  const { cartItems } = useCart()

  const handleDeleteProduct = () => {
    setLoading(true)
    deleteProduct(id).finally(() => {
      setLoading(false)
      getProducts()
    })
  }

  return (
    <div
      className="product-item"
      style={{ backgroundImage: `url(${productBg})` }}
    >
      {/*<img src={productBg} alt={name} className="product-item__img"/>*/}

      <div className="product-item__info">
        <div>{name}</div>
        <div>{price} Р</div>
        <div className="product-item__info-count">
          <div>5шт</div>
          <div>{count}шт</div>
        </div>
      </div>

      <CartCounter product_id={id} count={cartItems.find(cartItem => cartItem.product_id === product.id)?.count}/>

      {/*<LoadingButton*/}
      {/*  variant="contained"*/}
      {/*  loading={loading}*/}
      {/*  onClick={handleDeleteProduct}*/}
      {/*  sx={{ py: '0.8rem', mt: '1rem' }}*/}
      {/*>*/}
      {/*  Удалить*/}
      {/*</LoadingButton>*/}
    </div>
  )
}

export default ProductItem
