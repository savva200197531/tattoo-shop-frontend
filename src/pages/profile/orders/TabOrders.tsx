import React, { useEffect, useState } from 'react'

import { useOrders } from '../../../contexts/orders/OrdersContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import Spinner from '../../../components/Spinner/Spinner'
import OrderItem from './OrderItem'
import { Typography } from '@mui/material'

const TabOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getOrders, orders } = useOrders()
  const { user, isUserExist } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!isUserExist) return

    getOrders(user.id)
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isUserExist])

  return (
    <div className="">
      <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mb: '60px' }}>
        Мои заказы
      </Typography>

      {loading ? <Spinner /> : orders.map(order => <OrderItem key={order.id} order={order} />)}
    </div>
  )
}

export default TabOrders
