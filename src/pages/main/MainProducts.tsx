import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import ProductItem from '../products/ProductItem'
import { useProducts } from '../../contexts/products/ProductsContext'

const MainProducts = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getProducts, products } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="products-list">
      {loading ? <Spinner /> : (
        products.map(product => <ProductItem key={product.id} product={product} />)
      )}
    </div>
  )
}

export default MainProducts
