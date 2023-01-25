import React from 'react'
import { Button } from '@mui/material'
import { useCart } from '../../contexts/cart/CartContext'

const CartCheckout: React.FC = () => {
  const { getCartItemsCount } = useCart()

  return (
    <div className="cart-checkout">
      <p>Товары ({getCartItemsCount()})</p>

      <p>Итого </p>

      <Button variant="outlined" fullWidth>Перейти к оформлению</Button>
    </div>
  )
}

export default CartCheckout
