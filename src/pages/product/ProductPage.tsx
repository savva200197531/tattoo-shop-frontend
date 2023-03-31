import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { useProducts } from '../../contexts/products/ProductsContext'
import { Product } from '../../contexts/products/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import './styles.scss'
import ProductLayoutSlider from '../../components/ProductLayout/ProductLayoutSlider'
import { formatPrice } from '../../helpers/formatters/formatPrice'
import InStock from '../../components/InStock/InStock'
import AddToFavorite from '../../components/AddToFavorite/AddToFavorite'
import { Category } from '../../contexts/productsFilters/CategoriesContext/types'
import { Brand } from '../../contexts/productsFilters/BrandsContext/types'
import { useCategories } from '../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import { useBrands } from '../../contexts/productsFilters/BrandsContext/BrandsContext'
import { Amount } from '../../contexts/productsFilters/AmountContext/types'
import { Color } from '../../contexts/productsFilters/ColorsContext/types'
import { useColors } from '../../contexts/productsFilters/ColorsContext/ColorsContext'
import { useAmount } from '../../contexts/productsFilters/AmountContext/AmountContext'
import { formatAmount } from '../../helpers/formatters/formatAmount'
import { useCart } from '../../contexts/cart/CartContext'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'

const formatDescription = (text: string) => {
  return text.replace(/\n/g, '<br/>')
}

const ProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>({} as Product)
  const [category, setCategory] = useState<Category>({} as Category)
  const [brand, setBrand] = useState<Brand>({} as Brand)
  const [color, setColor] = useState<Brand>({} as Color)
  const [amount, setAmount] = useState<Brand>({} as Amount)

  const { getProduct } = useProducts()
  const { user } = useAuth()
  const { getCategory } = useCategories()
  const { findCartItemByProductId } = useCart()
  const { findFavoriteByProductId } = useFavorite()
  const { getBrand } = useBrands()
  const { getColor } = useColors()
  const { getAmount } = useAmount()
  const { id } = useParams()

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

  useEffect(() => {
    if (product.brand_id) {
      getBrand(product.brand_id).then(data => setBrand(data))
    }
  }, [product.brand_id])

  useEffect(() => {
    if (product.color_id) {
      getColor(product.color_id).then(data => setColor(data))
    }
  }, [product.color_id])

  useEffect(() => {
    if (product.amount_id) {
      getAmount(product.amount_id).then(data => setAmount(data))
    }
  }, [product.amount_id])

  return (
    <div className="product">
      <div className="container">
        <div className="product-content">
          {loading ? <Spinner/> : (
            <>
              <ProductLayoutSlider ids={product.img_ids} className="product-slider__wrapper"/>

              <div className="product-info bordered-box">
                <div className="product-info__top">
                  <div className="product-info__top-header">
                    <Typography variant="h5" component="h4" fontWeight={500}>
                      {category.name}{' '}
                      {brand.name}{' '}
                      {amount.name && formatAmount(amount.name)}{' '}
                      {color.name && color.name}{' '}
                    </Typography>

                    <AddToFavorite
                      product_id={product.id}
                      user_id={user.id}
                      isFavorite={!!findFavoriteByProductId(product.id)}
                    />
                  </div>

                  <Typography className="product-info__name" variant="h5" component="h5" fontWeight={500}>
                    {product.name}
                  </Typography>

                  <Typography component="h6" variant="h5" fontWeight={600}>
                    {formatPrice(product.price)}
                  </Typography>

                  <InStock count={product.count} />
                </div>

                <div className="product-info__bottom">
                  <CartCounter
                    className="product-cart-counter"
                    product={product}
                    count={findCartItemByProductId(product.id)?.count}
                    user_id={user.id}
                  />

                  {product.description && (
                    <div className="product-description" dangerouslySetInnerHTML={{ __html: formatDescription(product.description) }} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
