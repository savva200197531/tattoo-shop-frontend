import React from 'react'
import classNames from 'classnames'

import { AddToCartPayload, AddToLocalCartPayload } from '../../contexts/cart/types'
import { useCart } from '../../contexts/cart/CartContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import { Product } from '../../contexts/products/types'
import { StyledButton } from '../StyledButtons'
import Svg from '../../components/Svg/Svg'
import './styles.scss'

type Props = {
  count?: number
  product: Product
  user_id?: number
  className?: string
}

const CartCounter: React.FC<Props> = ({ count = 0, product, user_id, className }) => {
  const { addToCart, addToLocalCart } = useCart()
  const { isUserExist } = useAuth()

  const handleAddToCart = (count: number) => {
    if (!isUserExist) {
      const payload: AddToLocalCartPayload = {
        count,
        product,
      }

      addToLocalCart(payload)
      return
    } else if (user_id) {
      const payload: AddToCartPayload = {
        user_id,
        count,
        product_id: product.id,
      }

      return addToCart(payload)
    }
  }

  return (
    <div className={classNames('cart-counter', className)}>
      {count === 0 ?
        (
          <StyledButton
            disabled={product.count === count}
            startIcon={<Svg id="cart" className="" height={20} width={20}/>}
            onClick={() => handleAddToCart(1)}
            fullWidth
            variant="contained"
          >
            В корзину
          </StyledButton>
        ) :
        (
          <div className="cart-counter__active">
            <StyledButton fullWidth variant="text" onClick={() => handleAddToCart(count - 1)}>-</StyledButton>
            <div className="cart-counter__count">{count}</div>
            <StyledButton disabled={product.count === count} fullWidth variant="text" onClick={() => handleAddToCart(count + 1)}>+</StyledButton>
          </div>
        )
      }
    </div>
  )
}

export default CartCounter
