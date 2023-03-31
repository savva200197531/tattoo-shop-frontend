import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { useOrders } from '../../../contexts/orders/OrdersContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import Spinner from '../../../components/Spinner/Spinner'
import OrderItem from './OrderItem'
import AuthButton from '../../../components/AuthButton'
import './styles.scss'
import CatalogButton from '../../../components/CatalogButton'
import { Order } from '../../../contexts/orders/types'

const TabOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { getOrders } = useOrders()
  const { user, isUserExist } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!isUserExist) return

    getOrders(user.id)
      .then(data => {
        setOrders(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isUserExist])

  return (
    <div className="orders">
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
        Мои заказы
      </Typography>

      {isUserExist ? loading ? <Spinner/> : orders.length ?
        <div className="products-list">
          {orders.map(order => <OrderItem key={order.id} order={order}/>)}
        </div> :
        <CatalogButton/> : <AuthButton/>}
    </div>
  )
}

export default TabOrders
