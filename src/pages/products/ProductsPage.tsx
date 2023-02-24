import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import { useSearchParams } from 'react-router-dom'
import { Product, ProductsFilter, ProductsParams } from '../../contexts/products/types'
import { productsUrl } from '../../env'
import ProductsPagination from '../../components/ProductsPagination'

type Props = {
  children?: React.ReactNode
  ProductItem: React.FC<{ product: Product }>
}

const ProductsPage: React.FC<Props> = ({ children, ProductItem }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const { getProducts, products, productsMeta } = useProducts()

  useEffect(() => {
    setLoading(true)

    const params: ProductsParams = {
      limit: searchParams.get('limit'),
      page: searchParams.get('page'),
      route: productsUrl,
    }

    const filters: ProductsFilter = {
      category_id: searchParams.get('category'),
    }

    getProducts(params, filters).finally(() => {
      setLoading(false)
    })
  }, [searchParams])

  useEffect(() => {
    if (!searchParams.get('page')) {
      searchParams.set('page', '1')
      setSearchParams(searchParams)
    }
  }, [])

  return (
    <div className="products">
      <div className="container">
        <div className="products-content">
          {children}

          {loading ? <Spinner /> : (
            <>

              <div className="products-list">
                {products.map(product => <ProductItem key={product.id} product={product} />)}
              </div>

              <ProductsPagination page={productsMeta.currentPage} count={productsMeta.totalPages} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
