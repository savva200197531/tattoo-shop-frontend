import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import { useSearchParams } from 'react-router-dom'
import { Product, ProductsFilter, ProductsParams } from '../../contexts/products/types'
import { productsUrl } from '../../env'
import ProductsPagination from '../../components/ProductsPagination/ProductsPagination'
import ProductsHeader from './ProductsHeader'

type Props = {
  ProductItem: React.FC<{ product: Product }>
  Filters: React.FC<{ products: Product[] }>
  children?: React.ReactElement
}

const ProductsPage: React.FC<Props> = ({ ProductItem, Filters, children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const { getProducts, products, productsMeta } = useProducts()

  useEffect(() => {
    setLoading(true)

    const params: ProductsParams = {
      limit: searchParams.get('limit'),
      page: searchParams.get('page'),
      sortBy: searchParams.get('sort'),
      route: productsUrl,
    }

    const filters: ProductsFilter = {
      category_id: searchParams.get('category'),
      brand_id: searchParams.get('brand'),
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
          <ProductsHeader />

          {loading ? <Spinner /> : (
            <>
              <div className="">
                <Filters products={products} />

                <div className="products-list">
                  {products.map(product => <ProductItem key={product.id} product={product} />)}
                </div>
              </div>

              <ProductsPagination page={productsMeta.currentPage} count={productsMeta.totalPages} />
            </>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
