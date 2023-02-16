import React, { useEffect, useState } from 'react'
import { useOrders } from '../../contexts/orders/OrdersContext'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'

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
      {loading ? <Spinner /> : orders.map(order => order.id)}
    </div>
  )
}

export default TabOrders
