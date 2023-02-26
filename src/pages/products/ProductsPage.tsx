import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import { useSearchParams } from 'react-router-dom'
import { Product, ProductsFilter, ProductsMeta, ProductsParams } from '../../contexts/products/types'
import { productsUrl } from '../../env'
import ProductsPagination from '../../components/ProductsPagination/ProductsPagination'
import { Typography } from '@mui/material'

type Props = {
  ProductItem: React.FC<{ product: Product, loadProducts: () => void }>
  Filters: React.FC<{ products: Product[] }>
  CreateProduct?: React.FC<{ loadProducts: () => void }>
}

const ProductsPage: React.FC<Props> = ({ ProductItem, Filters, CreateProduct }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productsMeta, setProductsMeta] = useState<ProductsMeta>({} as ProductsMeta)

  const [searchParams, setSearchParams] = useSearchParams()
  const { getProducts } = useProducts()

  const loadProducts = () => {
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
      search: searchParams.get('search'),
    }

    getProducts(params, filters)
      .then(data => {
        setProducts(data.data)
        setProductsMeta(data.meta)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadProducts()
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
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Товары
          </Typography>

          {loading ? <Spinner/> : (
            <div className="products-main">
              <Filters products={products}/>

              <div className="products-main__products">
                <div className="products-list">
                  {products.map(product => <ProductItem key={product.id} product={product} loadProducts={loadProducts} />)}
                </div>

                <ProductsPagination page={productsMeta.currentPage} count={productsMeta.totalPages}/>
              </div>
            </div>
          )}

          {CreateProduct && <CreateProduct loadProducts={loadProducts} />}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
