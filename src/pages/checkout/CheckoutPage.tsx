import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import './styles.scss'
import CheckoutForm from './CheckoutForm'
import { useCart } from '../../contexts/cart/CartContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import CatalogButton from '../../components/CatalogButton'

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getCartItems, cart } = useCart()
  const { isUserExist, user } = useAuth()

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
    <div className="checkout">
      <div className="container">
        <div className="checkout-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Оформление заказа
          </Typography>

          {loading ? <Spinner /> : (
            cart.items?.length ? <CheckoutForm/> : <CatalogButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
