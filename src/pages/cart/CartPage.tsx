import React, { useEffect, useState } from 'react'

import { Stack, Typography, useMediaQuery } from '@mui/material'

import { useCart } from '../../contexts/cart/CartContext'
import CartItem from './CartItem'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import CartTotal from './CartTotal'
import CatalogButton from '../../components/CatalogButton'

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const mobile = useMediaQuery('(max-width:750px)')
  const { user, isUserExist } = useAuth()
  const { cart, getCartItems } = useCart()

  useEffect(() => {
    if (!isUserExist) return

    setLoading(true)

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
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Корзина
          </Typography>

          {loading ? <Spinner/> : cart?.items?.length ? (
            <Stack className="cart-main" direction={mobile ? 'column' : 'row'} spacing={2}>
              <div className="cart-items">
                {cart.items.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>)}
              </div>

              <CartTotal/>
            </Stack>
          ) : <CatalogButton/>}
        </div>
      </div>
    </div>
  )
}

export default CartPage
