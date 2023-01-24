import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/cart/CartContext'
import CartItem from './CartItem'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const { cartItems, getCartItems } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!user.id) return

    getCartItems(user.id).finally(() => {
      setLoading(false)
    })
  }, [user])

  return (
    <div>
      {loading ? <Spinner /> : cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
    </div>
  )
}

export default CartPage
