import React from 'react'

import { Product } from '../../contexts/products/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import AddToFavorite from '../../components/AddToFavorite/AddToFavorite'
import ProductLayout from '../../components/ProductLayout/ProductLayout'
import { useCart } from '../../contexts/cart/CartContext'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { user } = useAuth()
  const { findCartItemByProductId } = useCart()
  const { findFavoriteByProductId } = useFavorite()

  return (
    <ProductLayout
      product={product}
      headerContent={(
        <AddToFavorite
          product_id={product.id}
          user_id={user.id}
          isFavorite={!!findFavoriteByProductId(product.id)}
        />
      )}
      footerContent={(
        <CartCounter
          className="product-cart-counter"
          product={product}
          count={findCartItemByProductId(product.id)?.count}
          user_id={user.id}
        />
      )}
    />
  )
}

export default ProductItem
