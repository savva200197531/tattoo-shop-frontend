import React, { useEffect, useState } from 'react'

import Spinner from '../../../components/Spinner/Spinner'
import ProductItem from './ProductItem'
import CreateProduct from './CreateProduct'
import { useProducts } from '../../../contexts/products/ProductsContext'

const TabProducts = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { products, getProducts } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="products-list admin-products-list">
      {loading ? <Spinner/> : products.map(product => <ProductItem key={product.id} product={product}/>)}

      <CreateProduct/>
    </div>
  )
}

export default TabProducts
