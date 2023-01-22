import React, { useState } from 'react'

import { Button } from '@mui/material'

import { useCart } from '../../contexts/cart/CartContext'
import { useProducts } from '../../contexts/products/ProductsContext'
import { AddToCartPayload } from '../../contexts/cart/types'

type Props = {
  count?: number
  product_id: number
}

const CartCounter: React.FC<Props> = ({ count = 0, product_id }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { addToCart } = useCart()
  const { getProducts } = useProducts()

  const handleAddToCart = (count: number) => {
    const payload: AddToCartPayload = {
      count,
      product_id,
    }
    setLoading(true)

    addToCart(payload).finally(() => {
      getProducts().finally(() => {
        setLoading(false)
      })
    })
  }

  return (
    <div>
      {count === 0 ?
        (
          <Button onClick={() => handleAddToCart(1)}>Add to cart</Button>
        ) :
        (
          <>
            <Button onClick={() => handleAddToCart(count - 1)}>-</Button>
            <div>{count}</div>
            <Button onClick={() => handleAddToCart(count + 1)}>+</Button>
          </>
        )
      }
    </div>
  )
}

export default CartCounter
