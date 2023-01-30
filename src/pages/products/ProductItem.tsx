import React from 'react'

import { Product } from '../../contexts/products/types'
import productBg from '../../assets/images/product-bg.png'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import AddToFavorite from '../../components/AddToFavorite/AddToFavorite'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, count } = product

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
    <div
      className="product-item"
      style={{ backgroundImage: `url(${productBg})` }}
    >
      <AddToFavorite
        id={user.favorite?.find(favoriteProduct => favoriteProduct.product?.id === product.id)?.id}
        product_id={id}
        user_id={user.id}
        onSubmit={handleUpdate}
        isFavorite={!!user.favorite?.find(favoriteProduct => favoriteProduct.product?.id === product.id)}
      />

      <div className="product-item__info">
        <div>{name}</div>
        <div>{price} Р</div>
        <div className="product-item__info-count">
          <p>5шт</p>
          <p>{count}шт</p>
        </div>
      </div>

      <CartCounter
        product_id={id}
        count={user.cart?.find(cartItem => cartItem.product?.id === product.id)?.count}
        onSubmit={handleUpdate}
        user_id={user.id}
      />
    </div>
  )
}

export default ProductItem
