import React, { useEffect, useState } from 'react'
import { all } from 'axios'

import { useProducts } from '../../contexts/products/ProductsContext'
import CreateProductForm from './CreateProductForm'
import { useCart } from '../../contexts/cart/CartContext'
import ProductItem from './ProductItem'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import { useAuth } from '../../contexts/auth/AuthContext'

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getProducts, products } = useProducts()
  const { getCartItems } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!user.id) return

    all([getProducts(), getCartItems(user.id)]).finally(() => {
      setLoading(false)
    })
  }, [user])

  return (
    <div className="products">
      <div className="container">
        <div className="products-content">

          <CreateProductForm />

          <div className="products-list">
            {loading ? <Spinner /> : (
              products.map(product => <ProductItem key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
