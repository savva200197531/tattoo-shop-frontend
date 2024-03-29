import React from 'react'

import { Typography } from '@mui/material'

import { Order } from '../../contexts/orders/types'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import { formatDate } from '../../helpers/formatters/formatDate'
import ProductLayout from '../../components/ProductLayout/ProductLayout'
import { formatPrice } from '../../helpers/formatters/formatPrice'
import { formatOrderStatus } from '../../helpers/formatters/formatOrderStatus'
import { formatAddress } from '../../helpers/formatters/formatAddress'


type Props = {
  order: Order
}

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <div className="order-layout">
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
        Заказ №{order.id}
      </Typography>
      <p className="order-layout__date">
        от {formatDate(order.date)}
      </p>

      <div className="order-layout__content bordered-box">

        <ListWithTitle
          options={[
            {
              title: 'Получатель',
              text: order.name,
            },
            {
              title: 'Адрес',
              text: formatAddress(order),
            },
            {
              title: 'Телефон',
              text: order.phone,
            },
            {
              title: 'Статус',
              text: formatOrderStatus(order.status),
            },
          ]}
        />

        <ListWithTitle
          options={[
            // {
            //   title: 'Оплачено',
            //   text: order.price,
            // },
            // {
            //   title: 'Товары',
            //   text: order.price,
            // },
            // {
            //   title: 'Доставка',
            //   text: order.price,
            // },
            {
              title: 'Итого',
              text: formatPrice(order.price),
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
          />
        ))}
      </div>
    </div>
  )
}

export default OrderItem
