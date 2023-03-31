import React from 'react'

import { Favorite } from '../../../contexts/favorite/types'
import AddToFavorite from '../../../components/AddToFavorite/AddToFavorite'
import CartCounter from '../../../components/CartCounter/CartCounter'
import ProductLayout from '../../../components/ProductLayout/ProductLayout'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { useCart } from '../../../contexts/cart/CartContext'

type Props = {
  favoriteProduct: Favorite
}

const FavoriteItem: React.FC<Props> = ({ favoriteProduct }) => {
  const { product } = favoriteProduct
  const { user } = useAuth()
  const { findCartItemByProductId } = useCart()

  return (
    <ProductLayout
      product={product}
      headerContent={(
        <AddToFavorite
          product_id={product.id}
          user_id={user.id}
          isFavorite={true}
        />
      )}
      footerContent={(
        <CartCounter
          product={product}
          count={findCartItemByProductId(product.id)?.count}
          user_id={user.id}
        />
      )}
    />
  )
}

export default FavoriteItem
