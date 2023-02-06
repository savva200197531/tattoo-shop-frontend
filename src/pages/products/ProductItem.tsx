import React from 'react'

import { Product } from '../../contexts/products/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import AddToFavorite from '../../components/AddToFavorite/AddToFavorite'
import ProductLayout from '../../components/ProductLayout/ProductLayout'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { user, getUser } = useAuth()

  const handleUpdate = (promise: Promise<any>) => {
    promise
      .then(() => {
        getUser(user.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <ProductLayout
      product={product}
      headerContent={(
        <AddToFavorite
          id={user.favorite?.find(favoriteProduct => favoriteProduct.product?.id === product.id)?.id}
          product_id={product.id}
          user_id={user.id}
          onSubmit={handleUpdate}
          isFavorite={!!user.favorite?.find(favoriteProduct => favoriteProduct.product?.id === product.id)}
        />
      )}
      footerContent={(
        <CartCounter
          className="product-cart-counter"
          product_id={product.id}
          count={user.cart?.find(cartItem => cartItem.product?.id === product.id)?.count}
          onSubmit={handleUpdate}
          user_id={user.id}
        />
      )}
    />
  )
}

export default ProductItem
