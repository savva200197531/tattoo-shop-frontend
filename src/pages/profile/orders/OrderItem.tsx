import React from 'react'
import { Order } from '../../../contexts/orders/types'
import { imgSrc } from '../../../helpers/imgSrc'
import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import emptyImg from '../../../assets/images/empty-product-image.svg'
import { useNavigate } from 'react-router-dom'

type Props = {
  order: Order
}

const OrderItem: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/profile/orders/${order.id}`)} className="order-item">
      <ListWithTitle
        options={[
          {
            title: 'Дата заказа',
            text: order.date,
          },
          {
            title: 'Стоимость',
            text: order.price,
          },
        ]}
      />
      <p>№ {order.id}</p>
      <p>{order.status}</p>
      <img src={order.products[0]?.img_ids?.[0] ? imgSrc(order.products[0]?.img_ids?.[0] as number) : emptyImg} alt=""/>
    </div>
  )
}

export default OrderItem
