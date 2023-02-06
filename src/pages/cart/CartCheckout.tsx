import React from 'react'
import { useCart } from '../../contexts/cart/CartContext'
import { StyledButton } from '../../components/StyledButtons'

const CartCheckout: React.FC = () => {
  const { getCartItemsCount } = useCart()

  return (
    <div className="cart-checkout">
      <p>Товары ({getCartItemsCount()})</p>

      <p>Итого </p>

      <StyledButton variant="contained" fullWidth>Перейти к оформлению</StyledButton>
    </div>
  )
}

export default CartCheckout
