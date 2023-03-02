import React from 'react'

import IconButton from '@mui/material/IconButton'
import { Stack, useMediaQuery } from '@mui/material'

import { CartItem as CartItemType } from '../../contexts/cart/types'
import CartCounter from '../../components/CartCounter/CartCounter'
import Svg from '../../components/Svg/Svg'
import { useCart } from '../../contexts/cart/CartContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import StyledDialog from '../../components/StyledDialog/StyledDialog'
import { priceFormat } from '../../helpers/priceFormat'

type Props = {
  cartItem: CartItemType
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, count, id, user, price } = cartItem

  const mobile = useMediaQuery('(max-width:750px)')
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
    // <ProductLayout
    //   product={product}
    //   headerContent={(
    //     <StyledDialog
    //       icon={
    //         <IconButton type="button" sx={{ p: '6px' }}>
    //           <Svg id="trash" width={30} height={30}/>
    //         </IconButton>
    //       }
    //       title="Удалить товар"
    //       text="Вы точно хотите удалить товар из корзины?"
    //       handleSubmit={handleDeleteFromCart}
    //     />
    //   )}
    //   footerContent={(
    //     <CartCounter product_id={product.id} count={count} onSubmit={handleUpdate} user_id={user.id}/>
    //   )}
    // />
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
            text: priceFormat(product.price),
          },
          {
            title: 'Цена за все',
            text: priceFormat(price),
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

        <CartCounter product_id={product.id} count={count} onSubmit={handleUpdate} user_id={user.id}/>
      </div>
    </Stack>
  )
}

export default CartItem
