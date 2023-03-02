import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Order } from '../../contexts/orders/types'
import { useOrders } from '../../contexts/orders/OrdersContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import OrderItem from './OrderItem'
import { useNavigate, useParams } from 'react-router-dom'

const OrderPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [order, setOrder] = useState<Order>({} as Order)
  const { id } = useParams()

  const navigate = useNavigate()
  const { getOrder } = useOrders()
  const { isUserExist, user } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!id || !isUserExist) return

    getOrder(+id, user.id)
      .then(data => {
        setOrder(data)
      })
      .catch(error => {
        if (error.response.status === 403) {
          navigate(-1)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isUserExist, id])

  return (
    <div className="order">
      <div className="container order-container">
        <div className="order-content">
          {loading ? <Spinner/> : <OrderItem order={order}/>}
        </div>
      </div>
    </div>
  )
}

export default OrderPage
