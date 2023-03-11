import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Stack, Typography, useMediaQuery } from '@mui/material'

import { useProducts } from '../../contexts/products/ProductsContext'
import { Product } from '../../contexts/products/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import { useProductsFilters } from '../../contexts/productsFilters/ProductsFiltersContext'
import { Category } from '../../contexts/productsFilters/types'
import './styles.scss'
import ProductLayoutSlider from '../../components/ProductLayout/ProductLayoutSlider'
import { formatPrice } from '../../helpers/formatters/formatPrice'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'

const ProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>({} as Product)
  const [category, setCategory] = useState<Category>({} as Category)

  const mobile = useMediaQuery('(max-width:750px)')
  const { getProduct } = useProducts()
  const { user, getUser } = useAuth()
  const { getCategory } = useProductsFilters()
  const { id } = useParams()

  const handleUpdate = (promise: Promise<any>) => {
    promise
      .then(() => {
        getUser(user.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    setLoading(true)

    if (!id) return

    getProduct(+id)
      .then((data) => {
        setProduct(data)
      })
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  useEffect(() => {
    if (product.category_id) {
      getCategory(product.category_id).then(data => setCategory(data))
    }
  }, [product.category_id])

  return (
    <div className="product">
      <div className="container">
        <Stack className="product-content" direction={mobile ? 'column' : 'row'} spacing={2}>
          {loading ? <Spinner/> : (
            <>
              <ProductLayoutSlider ids={product.img_ids} className="product-slider__wrapper"/>

              <div className="product-info bordered-box">
                <div className="product-info__top">
                  <Typography variant="h5" component="h4" fontWeight={300} textAlign="center">
                    {category.name}
                  </Typography>

                  <Typography variant="h5" component="h5" fontWeight={300} textAlign="center">
                    {product.name}
                  </Typography>

                  <ListWithTitle
                    options={[
                      {
                        title: 'Цена',
                        text: formatPrice(product.price),
                      },
                      {
                        title: 'В наличии',
                        text: product.count,
                      },
                    ]}
                  />
                </div>

                <div className="product-info__bottom">
                  <CartCounter
                    className="product-cart-counter"
                    product={product}
                    count={user.cart?.find(cartItem => cartItem.product?.id === product.id)?.count}
                    onSubmit={handleUpdate}
                    user_id={user.id}
                  />

                  {product.description && (
                    <div className="product-description">
                      <p className="product-description__title">Описание</p>
                      <p className="product-description__text">
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </Stack>
      </div>
    </div>
  )
}

export default ProductPage
