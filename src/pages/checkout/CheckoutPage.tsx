import React from 'react'

import { Typography } from '@mui/material'

import './styles.scss'
import CheckoutForm from './CheckoutForm'
import { useCart } from '../../contexts/cart/CartContext'
import Spinner from '../../components/Spinner/Spinner'
import CatalogButton from '../../components/CatalogButton'

const CheckoutPage: React.FC = () => {
  const { cart, loading } = useCart()

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
