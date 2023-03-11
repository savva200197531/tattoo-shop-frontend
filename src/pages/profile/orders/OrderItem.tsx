import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Order } from '../../../contexts/orders/types'
import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import { formatDate } from '../../../helpers/formatters/formatDate'
import ProductLayoutSlider from '../../../components/ProductLayout/ProductLayoutSlider'
import { formatPrice } from '../../../helpers/formatters/formatPrice'
import { formatOrderStatus } from '../../../helpers/formatters/formatOrderStatus'

type Props = {
  order: Order
}

const OrderItem: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate()
  const imgIds = useRef<number[]>(order.products.map(product => product.img_ids).flat() as number[])

  const onClick = () => {
    navigate(`/orders/${order.id}`)
  }

  return (
    <div className="order-item bordered-box">
      <ListWithTitle
        options={[
          {
            title: 'Дата заказа',
            text: formatDate(order.date),
          },
          {
            title: 'Стоимость',
            text: formatPrice(order.price),
          },
          {
            title: 'Номер заказа',
            text: order.id,
          },
          {
            title: 'Статус заказа',
            text: formatOrderStatus(order.status),
          },
        ]}
      />

      <ProductLayoutSlider ids={imgIds.current} onClick={onClick} />
    </div>
  )
}

export default OrderItem
