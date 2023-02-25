import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import ProductItem from '../products/ProductItem'
import { useProducts } from '../../contexts/products/ProductsContext'
import { Product } from '../../contexts/products/types'

const MainProducts = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])

  const { getProducts } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts()
      .then(data => setProducts(data.data))
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="products-list">
      {loading ? <Spinner/> : (
        products.map(product => <ProductItem key={product.id} product={product}/>)
      )}
    </div>
  )
}

export default MainProducts
