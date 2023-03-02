import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Order } from '../../../contexts/orders/types'
import Spinner from '../../../components/Spinner/Spinner'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { useOrders } from '../../../contexts/orders/OrdersContext'
import OrderItem from '../../profile/orders/OrderItem'

const AdminTabOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<Order[]>([])

  const { getAllOrders } = useOrders()
  const { isUserExist, user } = useAuth()


  useEffect(() => {
    setLoading(true)

    if (!isUserExist || user.role !== 'Admin') return

    getAllOrders()
      .then(data => setOrders(data))
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isUserExist])


  return (
    <div className="products-list">
      {loading ? <Spinner/> : orders.map(order => (
        <OrderItem key={order.id} order={order}/>
      ))}
    </div>
  )
}

export default AdminTabOrders
