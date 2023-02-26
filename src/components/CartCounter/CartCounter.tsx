import React from 'react'

import { useCart } from '../../contexts/cart/CartContext'
import { AddToCartPayload, CartItem } from '../../contexts/cart/types'
import Svg from '../../components/Svg'
import './styles.scss'
import classNames from 'classnames'
import { StyledButton } from '../StyledButtons'

type Props = {
  count?: number
  product_id: number
  user_id: number
  onSubmit: (promise: Promise<CartItem>) => void
  className?: string
}

const CartCounter: React.FC<Props> = ({ count = 0, product_id, onSubmit, user_id, className }) => {
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
    <div className={classNames('cart-counter', className)}>
      {count === 0 ?
        (
          <StyledButton
            startIcon={<Svg id="cart" height={20} width={20}/>}
            onClick={() => handleAddToCart(1)}
            fullWidth
            variant="contained"
          >
            Добавить в корзину
          </StyledButton>
        ) :
        (
          <div className="cart-counter__active">
            <StyledButton variant="contained" onClick={() => handleAddToCart(count - 1)}>-</StyledButton>
            <div className="cart-counter__count">{count}</div>
            <StyledButton variant="contained" onClick={() => handleAddToCart(count + 1)}>+</StyledButton>
          </div>
        )
      }
    </div>
  )
}

export default CartCounter
