import React, { useEffect, useState } from 'react'
import { useProducts } from '../../contexts/products/ProductsContext'
import { useParams } from 'react-router-dom'
import { Product } from '../../contexts/products/types'
import { Carousel } from 'react-responsive-carousel'
import CartCounter from '../../components/CartCounter/CartCounter'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import { imgSrc } from '../../helpers/imgSrc'

const ProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>({} as Product)

  const { getProduct } = useProducts()
  const { user, getUser } = useAuth()
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
      .then(({ data }) => {
        setProduct(data)
      })
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


  return (
    <div className="product">
      <div className="container">
        <div className="product-content">
          {loading ? <Spinner /> : (
            <>
              <Carousel showStatus={false} className="product-slider" showThumbs={false} showArrows={true}>
                {product.img_ids?.map(id => (
                  <div className="product-slide" key={id}>
                    <img className="product-slide__img" src={imgSrc(id)} alt=""/>
                  </div>
                ))}
              </Carousel>

              <div className="product-info">
                <p className="">{product.name}</p>
                <p className="">{product.count}</p>
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
      </div>
    </div>
  )
}

export default ProductPage
