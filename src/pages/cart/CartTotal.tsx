import React from 'react'
import { useCart } from '../../contexts/cart/CartContext'
import { StyledButton } from '../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'

const CartTotal: React.FC = () => {
  const navigate = useNavigate()
  const { getCartItemsCount, getTotalPrice } = useCart()

  return (
    <div className="cart-total">
      <p>Товары ({getCartItemsCount()})</p>

      <p>Итого {getTotalPrice()}Р</p>

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
