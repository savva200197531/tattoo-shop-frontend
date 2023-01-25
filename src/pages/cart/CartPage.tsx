import React, { useEffect, useState } from 'react'

import { useCart } from '../../contexts/cart/CartContext'
import CartItem from './CartItem'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import CartCheckout from './CartCheckout'

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
    <div className="cart">
      <div className="container">
        <div className="cart-content">
          <h1 className="cart-title">Корзина</h1>
          <div className="cart-main">
            <div className="cart-items">
              {loading ?
                <Spinner/> :
                cartItems.length ?
                  cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>) :
                  <div>Корзина пуста</div>
              }
            </div>

            <CartCheckout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
