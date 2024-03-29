import React, { useEffect, useState } from 'react'

import { useProducts } from '../../contexts/products/ProductsContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import { useSearchParams } from 'react-router-dom'
import { Product, ProductsFilter, ProductsMeta, ProductsParams } from '../../contexts/products/types'
import { productsUrl } from '../../env'
import ProductsPagination from '../../components/ProductsPagination/ProductsPagination'
import { Typography } from '@mui/material'
import { sortVariables } from '../../components/FormInputs/Select/variables'
import { SelectVariables } from '../../components/FormInputs/Select/types'
import { formatArrayFromUrl } from '../../helpers/formatters/formatArrayFromUrl'

type Props = {
  ProductItem: React.FC<{ product: Product, loadProducts: () => void }>
  Filters: React.FC<{ products: Product[] }>
  CreateProduct?: React.FC<{ loadProducts: () => void }>
}

const ProductsPage: React.FC<Props> = ({ ProductItem, Filters, CreateProduct }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productsMeta, setProductsMeta] = useState<ProductsMeta>({} as ProductsMeta)

  const [searchParams] = useSearchParams()
  const { getProducts } = useProducts()

  const loadProducts = () => {
    setLoading(true)

    const sort = searchParams.get('sort')

    const params: ProductsParams = {
      limit: searchParams.get('limit'),
      page: searchParams.get('page'),
      sortBy: sort ? sortVariables[sort as keyof SelectVariables] : null,
      route: productsUrl,
    }

    const price_min = formatArrayFromUrl(searchParams.get('price'))?.[0].toString()

    const price_max = formatArrayFromUrl(searchParams.get('price'))?.[1].toString()

    const filters: ProductsFilter = {
      category_id: searchParams.get('category'),
      brand_id: searchParams.get('brand'),
      price_min: price_min,
      price_max: price_max,
      color: formatArrayFromUrl(searchParams.get('color')),
      amount: formatArrayFromUrl(searchParams.get('amount')),
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

  // useEffect(() => {
  //   if (!searchParams.get('page')) {
  //     searchParams.set('page', '1')
  //   }
  //
  //   if (!searchParams.get('limit')) {
  //     searchParams.set('limit', '15')
  //   }
  //
  //   setSearchParams(searchParams)
  // }, [])

  return (
    <div className="products">
      <div className="container">
        <div className="products-content">
          {CreateProduct && <CreateProduct loadProducts={loadProducts}/>}

          {/*<Typography variant="h4" component="h1" fontWeight={500} textAlign="center">*/}
          {/*  Товары*/}
          {/*</Typography>*/}

          <div className="products-content__main">
            <Filters products={products}/>

            {loading ? <Spinner/> : (
              <div className="products-main__products">
                {products.length ? (
                  <>
                    <div className="products-list">
                      {products.map(product => (
                        <ProductItem key={product.id} product={product} loadProducts={loadProducts}/>
                      ))}
                    </div>

                    <ProductsPagination page={productsMeta.currentPage} count={productsMeta.totalPages}/>
                  </>
                ) : (
                  <Typography variant="h5" component="h3" fontWeight={400} textAlign="center">
                    Товаров не найдено :(
                  </Typography>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
