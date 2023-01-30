import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import './styles.scss'
import AdminProductItem from './AdminProductItem'
import CreateProduct from './CreateProduct'
import Spinner from '../../components/Spinner/Spinner'

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { products, getProducts } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="admin">
      <div className="container">
        <div className="admin-content">
          <div className="products-list">
            {loading ? <Spinner/> : products.map(product => <AdminProductItem key={product.id} product={product}/>)}
          </div>

          <CreateProduct />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
