import React from 'react'

import { CartItem as CartItemType } from '../../contexts/cart/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import productImg from '../../assets/images/product-bg.png'
import Svg from '../../components/Svg'
import IconButton from '@mui/material/IconButton'
import { useCart } from '../../contexts/cart/CartContext'

type Props = {
  cartItem: CartItemType
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, count, id, user, price } = cartItem

  const { deleteFromCart, getCartItems } = useCart()

  const handleDeleteFromCart = () => {
    deleteFromCart(id).finally(() => {
      getCartItems(user.id)
    })
  }

  return (
    <div className="cart-item">
      <img src={productImg} alt=""/>
      <div className="cart-item__middle">
        <p>{product.name}</p>
        <p>{product.count} в наличии</p>
        <CartCounter product_id={product.id} count={count} />
      </div>
      <div className="cart-item__right">
        <p>{price}Р</p>
        <IconButton onClick={handleDeleteFromCart} type="button" sx={{ p: '6px' }}>
          <Svg id="trash" width={30} height={30} />
        </IconButton>
      </div>
    </div>
  )
}

export default CartItem
