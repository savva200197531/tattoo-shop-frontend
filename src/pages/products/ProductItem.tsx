import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import productBg from '../../assets/images/product-bg.png'
import CartCounter from '../../components/CartCounter/CartCounter'
import Svg from '../../components/Svg'
import EditProduct from './EditProduct'
import { useAuth } from '../../contexts/auth/AuthContext'
import AddToFavorite from '../../components/AddToFavorite/AddToFavorite'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, count } = product

  const { deleteProduct, getProducts } = useProducts()
  // const { cartItems } = useCart()
  const { user, getUser } = useAuth()

  const handleDeleteProduct = () => {
    // setLoading(true)
    deleteProduct(id).finally(() => {
      // setLoading(false)
      getProducts()
    })
  }

  const handleUpdate = (promise: Promise<any>) => {
    promise
      .then(() => {
        getUser(user.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div
      className="product-item"
      style={{ backgroundImage: `url(${productBg})` }}
    >
      <AddToFavorite
        id={user.favorite.find(favoriteProduct => favoriteProduct.product?.id === product.id)?.id}
        product_id={id}
        user_id={user.id}
        onSubmit={handleUpdate}
        isFavorite={!!user.favorite.find(favoriteProduct => favoriteProduct.product?.id === product.id)}
      />

      <EditProduct />

      <IconButton style={{ position: 'absolute' }} className="product-item__delete" onClick={handleDeleteProduct} type="button" sx={{ p: '6px' }}>
        <Svg id="trash" width={30} height={30} />
      </IconButton>

      <div className="product-item__info">
        <div>{name}</div>
        <div>{price} Р</div>
        <div className="product-item__info-count">
          <div>5шт</div>
          <div>{count}шт</div>
        </div>
      </div>

      <CartCounter
        product_id={id}
        count={user.cart.find(cartItem => cartItem.product?.id === product.id)?.count}
        onSubmit={handleUpdate}
        user_id={user.id}
      />
    </div>
  )
}

export default ProductItem
