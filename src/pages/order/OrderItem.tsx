import React from 'react'
import { Order } from '../../contexts/orders/types'
import { Typography } from '@mui/material'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'

type Props = {
  order: Order
}

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <div className="order-layout">
      <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mb: '60px' }}>
        Заказ №{order.id}
      </Typography>
      <p className="order-layout__date">{order.date}</p>

      <div className="order-layout__content">

        <div className="order-layout__column">
          <div>
            <p>Доставка в ...</p>
            <p>{order.region} {order.city} {order.address}</p>
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
            {
              title: 'Доставка',
              text: order.price,
            },
            {
              title: 'Итого',
              text: order.price,
            },
          ]}
        />

      </div>

      <div className="order-layout__products">
        {order.products?.map(product => (
          <div key={product.id} className="order-layout__product">
            <img src={product.img_ids?.length ? imgSrc(product.img_ids[0]) : emptyImg} alt=""/>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderItem
