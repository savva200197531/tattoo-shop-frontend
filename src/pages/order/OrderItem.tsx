import React from 'react'
import { Order } from '../../contexts/orders/types'
import { Typography } from '@mui/material'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import { dateFormat } from '../../helpers/dateFormat'
import ProductLayout from '../../components/ProductLayout/ProductLayout'

type Props = {
  order: Order
}

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <div className="order-layout">
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center" sx={{ mb: '60px', mt: '70px' }}>
        Заказ №{order.id}
      </Typography>
      <p className="order-layout__date">
        от {dateFormat(order.date)}
      </p>

      <div className="order-layout__content">

        <div className="order-layout__column">
          <div>
            <p className="order-layout__column-destination text-bold">Доставка в ...</p>
            <p className="order-layout__column-address text-bold">{order.region}, {order.city}, {order.address}</p>
          </div>

          <ListWithTitle
            options={[
              {
                title: 'Получатель',
                text: order.name,
              },
              {
                title: 'Телефон',
                text: order.phone,
              },
            ]}
          />
        </div>

        <ListWithTitle
          options={[
            {
              title: 'Оплачено',
              text: order.price,
            },
            {
              title: 'Товары',
              text: order.price,
            },
            // {
            //   title: 'Доставка',
            //   text: order.price,
            // },
            {
              title: 'Итого',
              text: order.price,
            },
          ]}
        />

      </div>

      <div className="products-list">
        {order.products?.map(product => (
          <ProductLayout
            key={product.id}
            product={product}
            disabled={true}
            // headerContent={(
            //   <AddToFavorite
            //     id={product.id}
            //     product_id={product.id}
            //     user_id={order.user.id}
            //     onSubmit={handleUpdateFavorite}
            //     isFavorite={!!user.favorite?.find(favoriteProduct => favoriteProduct.product?.id === product.id)}
            //   />
            // )}
            // footerContent={(
            //   <CartCounter
            //     product_id={product.id}
            //     count={user.cart?.find(cartItem => cartItem.product?.id === product.id)?.count}
            //     onSubmit={handleUpdateCart}
            //     user_id={user.id}
            //   />
            // )}
          />
        ))}
      </div>
    </div>
  )
}

export default OrderItem
