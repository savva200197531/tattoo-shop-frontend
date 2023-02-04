import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import ProductItem from './ProductItem'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import ProductsFilters from './ProductsFilters'
import ProductsHeader from './ProductsHeader'

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getProducts, products } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      setLoading(false)
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
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
