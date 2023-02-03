import React from 'react'
import { Favorite } from '../../contexts/favorite/types'
import AddToFavorite from '../../components/AddToFavorite/AddToFavorite'
import CartCounter from '../../components/CartCounter/CartCounter'
import ProductLayout from '../../components/ProductLayout/ProductLayout'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'

type Props = {
  favoriteProduct: Favorite
}

const FavoriteItem: React.FC<Props> = ({ favoriteProduct }) => {
  const { product, id } = favoriteProduct
  const { getFavoriteProducts } = useFavorite()
  const { getUser, user } = useAuth()

  const handleUpdate = (promise: Promise<any>) => {
    promise
      .then(() => {
        getUser(user.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // const handleUpdateCart = (promise: Promise<any>) => {
  //   promise
  //     .then(() => {
  //       getUser(user.id)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  return (
    <ProductLayout
      product={product}
      headerContent={(
        <AddToFavorite
          id={id}
          product_id={product.id}
          user_id={user.id}
          onSubmit={handleUpdate}
          isFavorite={true}
        />
      )}
      footerContent={(
        <CartCounter
          product_id={product.id}
          count={user.cart?.find(cartItem => cartItem.product?.id === product.id)?.count}
          onSubmit={handleUpdate}
          user_id={user.id}
        />
      )}
    />
  )
}

export default FavoriteItem
