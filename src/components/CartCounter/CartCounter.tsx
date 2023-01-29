import React from 'react'

import { Button } from '@mui/material'

import { useCart } from '../../contexts/cart/CartContext'
import { AddToCartPayload, CartItem } from '../../contexts/cart/types'
import Svg from '../../components/Svg'
import './styles.scss'

type Props = {
  count?: number
  product_id: number
  user_id: number
  onSubmit: (promise: Promise<CartItem>) => void
}

const CartCounter: React.FC<Props> = ({ count = 0, product_id, onSubmit, user_id }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (count: number) => {
    const payload: AddToCartPayload = {
      user_id,
      count,
      product_id,
    }

    onSubmit(addToCart(payload))
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
