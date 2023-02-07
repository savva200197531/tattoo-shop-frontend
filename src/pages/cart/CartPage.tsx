import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { useCart } from '../../contexts/cart/CartContext'
import CartItem from './CartItem'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import CartTotal from './CartTotal'

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const { cartItems, getCartItems } = useCart()
  const { user, isUserExist } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!isUserExist) return

    getCartItems(user.id)
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isUserExist])

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-content">
          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Корзина
          </Typography>
          {/*<h1 className="cart-title"></h1>*/}
          <div className="cart-main">
            <div className="cart-items">
              {loading ?
                <Spinner/> :
                cartItems.length ?
                  cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>) :
                  <div>Корзина пуста</div>
              }
            </div>

            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
