import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { useOrders } from '../../../contexts/orders/OrdersContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import Spinner from '../../../components/Spinner/Spinner'
import OrderItem from './OrderItem'
import AuthButton from '../../../components/AuthButton'
import './styles.scss'
import CatalogButton from '../../../components/CatalogButton'

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
    <div className="orders">
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
        Мои заказы
      </Typography>

      <div className="products-list">
        {isUserExist ? loading ? <Spinner/> : orders.length ?
          orders.map(order => <OrderItem key={order.id} order={order}/>) :
          <CatalogButton/> : <AuthButton/>}
      </div>
    </div>
  )
}

export default TabOrders
