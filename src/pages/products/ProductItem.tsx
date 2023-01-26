import React from 'react'

import { Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import { useCart } from '../../contexts/cart/CartContext'
import productBg from '../../assets/images/product-bg.png'
import CartCounter from '../../components/CartCounter/CartCounter'
import Svg from '../../components/Svg'
import IconButton from '@mui/material/IconButton'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'
import EditProduct from './EditProduct'
import { AddToFavoritePayload } from '../../contexts/favorite/types'
import { useAuth } from '../../contexts/auth/AuthContext'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, count } = product

  const { deleteProduct, getProducts } = useProducts()
  const { addToFavorite } = useFavorite()
  const { cartItems } = useCart()
  const { user } = useAuth()

  const handleDeleteProduct = () => {
    // setLoading(true)
    deleteProduct(id).finally(() => {
      // setLoading(false)
      getProducts()
    })
  }

  const handleAddToFavorites = () => {
    if (!user.id) {
      return
    }

    const payload: AddToFavoritePayload = {
      product_id: id,
      user_id: user.id,
    }

    addToFavorite(payload)
  }

  return (
    <div
      className="product-item"
      style={{ backgroundImage: `url(${productBg})` }}
    >
      <IconButton style={{ position: 'absolute' }} className="product-item__favorite" onClick={handleAddToFavorites} type="button" sx={{ p: '6px' }}>
        <Svg id="hearth" width={30} height={30} />
      </IconButton>

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

      <CartCounter product_id={id} count={cartItems.find(cartItem => cartItem.product.id === product.id)?.count}/>
    </div>
  )
}

export default ProductItem
