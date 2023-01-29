import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import ProductItem from './ProductItem'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import CreateProduct from './CreateProduct'
import ProductsFilters from './ProductsFilters'
import ProductsHeader from './ProductsHeader'
import { useAuth } from '../../contexts/auth/AuthContext'

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getProducts, products } = useProducts()
  const { user, getUser } = useAuth()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      if (!user.id) {
        setLoading(false)
      } else {
        getUser(user.id).finally(() => {
          setLoading(false)
        })
      }
    })
  }, [])

  return (
    <div className="products">
      <div className="container">
        <div className="products-content">
          <ProductsHeader />

          <ProductsFilters />

          <div className="products-list">
            {loading ? <Spinner /> : (
              products.map(product => <ProductItem key={product.id} product={product} />)
            )}
          </div>

          <CreateProduct />
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
