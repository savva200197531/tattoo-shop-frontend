import React, { useEffect, useState } from 'react'
import './styles.scss'
import CheckoutForm from './CheckoutForm'
import { useCart } from '../../contexts/cart/CartContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import { Typography } from '@mui/material'
import { StyledButton } from '../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const { getCartItems, cart } = useCart()
  const { isUserExist, user } = useAuth()

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
    <div className="checkout">
      <div className="container">
        <div className="checkout-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Оформление заказа
          </Typography>

          {loading ? <Spinner /> : (
            cart.items?.length ? <CheckoutForm/> : (
              <StyledButton onClick={() => navigate('/catalog')}>Перейти в каталог</StyledButton>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
