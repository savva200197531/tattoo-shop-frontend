import React, { useEffect, useState } from 'react'
import { useProducts } from '../../contexts/products/ProductsContext'
import { useParams } from 'react-router-dom'
import { Product } from '../../contexts/products/types'
import { Carousel } from 'react-responsive-carousel'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'
import { useProductsFilters } from '../../contexts/productsFilters/ProductsFiltersContext'
import { Category } from '../../contexts/productsFilters/types'
import { Typography } from '@mui/material'

const ProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>({} as Product)
  const [category, setCategory] = useState<Category>({} as Category)

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
        <div className="product-content">
          {loading ? <Spinner/> : (
            <>
              {product.img_ids?.length ? (
                <Carousel showStatus={false} className="product-slider" showThumbs={false} showArrows={true}>
                  {product.img_ids?.map(id => (
                    <div className="product-slide" key={id}>
                      <img className="product-slide__img" src={imgSrc(id)} alt=""/>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img className="" src={emptyImg} alt=""/>
              )}

              <div className="product-info">
                <Typography variant="h5" component="h4" fontWeight={300} textAlign="center">
                  {category.name}
                </Typography>

                <Typography variant="h5" component="h5" fontWeight={300} textAlign="center">
                  {product.name}
                </Typography>

                <Typography variant="h6" component="h6" fontWeight={300} textAlign="center">
                  {product.price} Р
                </Typography>
                <p className="">В наличии: {product.count}</p>

                <CartCounter
                  className="product-cart-counter"
                  product_id={product.id}
                  count={user.cart?.find(cartItem => cartItem.product?.id === product.id)?.count}
                  onSubmit={handleUpdate}
                  user_id={user.id}
                />
              </div>
            </>
          )}
        </div>

        <div>

        </div>
      </div>
    </div>
  )
}

export default ProductPage
