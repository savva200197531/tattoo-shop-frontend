import React from 'react'
import { all } from 'axios'

import { Button } from '@mui/material'

import { useCart } from '../../contexts/cart/CartContext'
import { useProducts } from '../../contexts/products/ProductsContext'
import { AddToCartPayload } from '../../contexts/cart/types'
import Svg from '../../components/Svg'
import './styles.scss'
import { useAuth } from '../../contexts/auth/AuthContext'

type Props = {
  count?: number
  product_id: number
}

const CartCounter: React.FC<Props> = ({ count = 0, product_id }) => {
  const { addToCart, getCartItems } = useCart()
  const { getProducts } = useProducts()
  const { user } = useAuth()

  const handleAddToCart = (count: number) => {
    const payload: AddToCartPayload = {
      user_id: user.id,
      count,
      product_id,
    }

    addToCart(payload).then(() => {
      all([getProducts(), getCartItems(user.id)])
    })
  }

  return (
    <div className="cart-counter">
      {count === 0 ?
        (
          <Button
            startIcon={<Svg id="cart" height={20} width={20}/>}
            onClick={() => handleAddToCart(1)}
            fullWidth
            variant="outlined"
          >
            Добавить в корзину
          </Button>
        ) :
        (
          <div className="cart-counter__active">
            <Button variant="outlined" onClick={() => handleAddToCart(count - 1)}>-</Button>
            <div>{count}</div>
            <Button variant="outlined" onClick={() => handleAddToCart(count + 1)}>+</Button>
          </div>
        )
      }
    </div>
  )
}

export default CartCounter
