import React, { useEffect, useState } from 'react'
import { useProducts } from '../../contexts/products/ProductsContext'
import CreateProductForm from './CreateProductForm'
import ProductItem from './ProductItem'
import axios from 'axios'
import { useCart } from '../../contexts/cart/CartContext'

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getProducts, products } = useProducts()
  const { getCartItems } = useCart()

  useEffect(() => {
    setLoading(true)

    axios.all([getProducts(), getCartItems()]).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <CreateProductForm />
      {!loading && products.map(product => <ProductItem product={product} />)}
    </div>
  )
}

export default ProductsPage
