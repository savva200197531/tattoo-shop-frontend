import React from 'react'

import IconButton from '@mui/material/IconButton'

import { CartItem as CartItemType } from '../../contexts/cart/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import Svg from '../../components/Svg'
import { useCart } from '../../contexts/cart/CartContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import StyledDialog from '../../components/StyledDialog/StyledDialog'

type Props = {
  cartItem: CartItemType
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, count, id, user, price } = cartItem

  const { deleteFromCart, getCartItems } = useCart()
  const { getUser } = useAuth()

  const handleDeleteFromCart = () => {
    deleteFromCart(id)
      .finally(() => {
        getUser(user.id)
        getCartItems(user.id).catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleUpdate = (promise: Promise<any>) => {
    promise
      .then(({ data }) => {
        getCartItems(user.id).catch(error => {
          console.log(error)
        })
        if (data.action === 'delete') {
          getUser(user.id)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="cart-item">
      <img src={product.img_ids?.length ? imgSrc(product.img_ids?.[0] as number) : emptyImg} alt=""/>
      <div className="cart-item__middle">
        <ListWithTitle
          options={[
            {
              title: 'Название',
              text: product.name,
            },
            {
              title: 'В наличии',
              text: product.count,
            },
          ]}
        />
        <CartCounter product_id={product.id} count={count} onSubmit={handleUpdate} user_id={user.id}/>
      </div>
      <div className="cart-item__right">
        <p>{price}Р</p>

        <StyledDialog
          icon={
            <IconButton type="button" sx={{ p: '6px' }}>
              <Svg id="trash" width={30} height={30}/>
            </IconButton>
          }
          title="Удалить товар"
          text="Вы точно хотите удалить товар из корзины?"
          handleSubmit={handleDeleteFromCart}
        />

      </div>
    </div>
  )
}

export default CartItem
