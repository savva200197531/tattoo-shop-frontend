import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/cart/CartContext'
import CartItem from './CartItem'

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const { cartItems, getCartItems } = useCart()

  useEffect(() => {
    setLoading(true)

    getCartItems().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
    </div>
  )
}

export default CartPage
