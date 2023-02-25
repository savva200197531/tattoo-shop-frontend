import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import { useSearchParams } from 'react-router-dom'
import { Product, ProductsFilter, ProductsParams } from '../../contexts/products/types'
import { productsUrl } from '../../env'
import ProductsPagination from '../../components/ProductsPagination/ProductsPagination'
import { Typography } from '@mui/material'

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
      price_min: searchParams.get('price_min'),
      price_max: searchParams.get('price_max'),
    }

    getProducts(params, filters).finally(() => {
      setLoading(false)
    })
  }, [searchParams])

  useEffect(() => {
    if (!searchParams.get('page')) {
      searchParams.set('page', '1')
    }

    if (!searchParams.get('limit')) {
      searchParams.set('limit', '10')
    }

    setSearchParams(searchParams)
  }, [])

  return (
    <div className="products">
      <div className="container">
        <div className="products-content">
          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Товары
          </Typography>

          {loading ? <Spinner/> : (
            <div className="products-main">
              <Filters products={products}/>

              <div className="products-main__products">
                <div className="products-list">
                  {products.map(product => <ProductItem key={product.id} product={product}/>)}
                </div>

                <ProductsPagination page={productsMeta.currentPage} count={productsMeta.totalPages}/>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
