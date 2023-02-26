import React, { useEffect, useState } from 'react'

import { useOrders } from '../../../contexts/orders/OrdersContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import Spinner from '../../../components/Spinner/Spinner'
import OrderItem from './OrderItem'
import { Typography } from '@mui/material'
import { StyledButton } from '../../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'

const TabOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getOrders, orders } = useOrders()
  const { user, isUserExist } = useAuth()
  const navigate = useNavigate()

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
      <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mb: '60px' }}>
        Мои заказы
      </Typography>

      {loading ? <Spinner /> : orders.length ? orders.map(order => <OrderItem key={order.id} order={order} />) : (
        <StyledButton onClick={() => navigate('/catalog')}>Перейти в каталог</StyledButton>
      )}
    </div>
  )
}

export default TabOrders
