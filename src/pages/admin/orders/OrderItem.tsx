import React from 'react'
import { Order } from '../../../contexts/orders/types'

type Props = {
  order: Order
}

const AdminOrderItem: React.FC<Props> = ({ order }) => {
  return (
    <div>
      {order.id}
    </div>
  )
}

export default AdminOrderItem
