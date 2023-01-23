import React from 'react'

import { CartItem as CartItemType } from '../../contexts/cart/types'
import CartCounter from '../../components/CartCounter/CartCounter'

type Props = {
  cartItem: CartItemType
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product_id, count } = cartItem

  return (
    <div>
      <CartCounter product_id={product_id} count={count} />
    </div>
  )
}

export default CartItem
