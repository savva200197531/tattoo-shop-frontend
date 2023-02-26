import React from 'react'
import { useCart } from '../../contexts/cart/CartContext'
import { StyledButton } from '../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'

const CartTotal: React.FC = () => {
  const navigate = useNavigate()
  const { cart } = useCart()

  return (
    <div className="cart-total">
      <ListWithTitle
        options={[
          {
            title: 'Товары',
            text: `(${cart.totalProductsCount})`,
          },
          {
            title: 'Итого',
            text: `${cart.totalPrice} Р`,
          },
        ]}
      />

      <StyledButton
        variant="contained"
        fullWidth
        onClick={() => navigate('/checkout')}
      >
        Перейти к оформлению
      </StyledButton>
    </div>
  )
}

export default CartTotal
