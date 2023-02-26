import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { useCart } from '../../contexts/cart/CartContext'
import CartItem from './CartItem'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import CartTotal from './CartTotal'
import { StyledButton } from '../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { cart, getCartItems } = useCart()
  const { user, isUserExist } = useAuth()
  const navigate = useNavigate()

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
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Корзина
          </Typography>

          {loading ?
            <Spinner/> :
            cart?.items?.length ? (
              <div className="cart-main">
                <div className="cart-items">
                  {cart.items.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>)}
                </div>

                <CartTotal/>
              </div>
            ) : (
              <div className="cart-empty">
                {/*<Typography variant="h5" component="h3" fontWeight={500} sx={{ mb: '70px' }}>*/}
                {/*  Тут пусто(((*/}
                {/*</Typography>*/}

                <StyledButton onClick={() => navigate('/catalog')}>Перейти в каталог</StyledButton>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CartPage
