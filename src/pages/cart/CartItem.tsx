import React from 'react'

import IconButton from '@mui/material/IconButton'
import { Stack, useMediaQuery } from '@mui/material'

import { CartItem as CartItemType } from '../../contexts/cart/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import Svg from '../../components/Svg/Svg'
import { useCart } from '../../contexts/cart/CartContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-img.png'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import StyledDialog from '../../components/StyledDialog/StyledDialog'
import { formatPrice } from '../../helpers/formatters/formatPrice'

type Props = {
  cartItem: CartItemType
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, count, id, user, price } = cartItem

  const mobile = useMediaQuery('(max-width:750px)')
  const { deleteFromCart, getCartItems, deleteFromLocalCart } = useCart()
  const { getUser, isUserExist } = useAuth()

  const handleDeleteFromCart = () => {
    if (isUserExist && user) {
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
    } else {
      deleteFromLocalCart(id)
    }
  }

  const handleUpdate = (promise: Promise<any>) => {
    if (!user) return
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
    <Stack className="cart-item bordered-box" direction={mobile ? 'column' : 'row'} sx={{ alignItems: mobile ? 'center' : 'unset' }} spacing={2}>
      <div className="cart-item__left">
        <img className="cart-item__img" src={product.img_ids?.length ? imgSrc(product.img_ids?.[0] as number) : emptyImg} alt=""/>
      </div>

      <ListWithTitle
        className="cart-item__middle"
        options={[
          {
            title: 'Название',
            text: product.name,
          },
          {
            title: 'В наличии',
            text: product.count,
          },
          {
            title: 'Цена за шт',
            text: formatPrice(product.price),
          },
          {
            title: 'Цена за все',
            text: formatPrice(price),
          },
        ]}
      />

      <div className="cart-item__right">
        <StyledDialog
          icon={
            <IconButton className="cart-item__delete" type="button" sx={{ p: '6px', position: 'absolute' }}>
              <Svg id="trash" width={30} height={30}/>
            </IconButton>
          }
          title="Удалить товар"
          text="Вы точно хотите удалить товар из корзины?"
          handleSubmit={handleDeleteFromCart}
        />

        <CartCounter product={product} count={count} onSubmit={handleUpdate} user_id={user?.id}/>
      </div>
    </Stack>
  )
}

export default CartItem
