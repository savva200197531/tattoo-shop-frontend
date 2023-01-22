import React from 'react'
import { Product } from '../../contexts/products/types'
import { Button } from '@mui/material'
import { useProducts } from '../../contexts/products/ProductsContext'
import { useCart } from '../../contexts/cart/CartContext'
import CartCounter from '../cart/CartCounter'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, count } = product

  const { deleteProduct } = useProducts()
  const { cartItems } = useCart()

  const handleDeleteProduct = () => {
    deleteProduct(id)
  }

  return (
    <div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{count}</div>

      <CartCounter product_id={id} count={cartItems.find(cartItem => cartItem.product_id === product.id)?.count} />
      <Button onClick={handleDeleteProduct}>delete</Button>
    </div>
  )
}

export default ProductItem
