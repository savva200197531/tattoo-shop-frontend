import React from 'react'
import { Order } from '../../../contexts/orders/types'
import { imgSrc } from '../../../helpers/imgSrc'

type Props = {
  order: Order
}

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <div className="order-item">
      <div>
        <p>{order.date}</p>
        <p>Стоимость {order.price}Р</p>
      </div>
      <p>№ {order.id}</p>
      <p>{order.status}</p>
      <img src={imgSrc(order.products[0]?.img_ids?.[0] as number)} alt=""/>
    </div>
  )
}

export default OrderItem
