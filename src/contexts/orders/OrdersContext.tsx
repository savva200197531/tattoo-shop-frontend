import React, { ReactNode, useContext, useState } from 'react'

import { CreateOrder, CreateOrderResponse, GetOrder, GetOrders, Order, OrdersContextProps } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'
import { useNavigate } from 'react-router-dom'

const OrdersContext = React.createContext<OrdersContextProps>({} as OrdersContextProps)

export const useOrders = () => useContext(OrdersContext)

type Props = {
  children: ReactNode
}

export const OrdersProvider: React.FC<Props> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const navigate = useNavigate()

  const createOrder: CreateOrder = (payload) => {
    return axios.post<CreateOrderResponse>(`${requestUrl}/orders`, payload)
      .then(({ data }) => {
        navigate(`/orders/${data.order.id}`)
        window.open(data.payment.confirmation.confirmation_url, '_blank')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getOrders: GetOrders = (user_id) => {
    return axios.get<Order[]>(`${requestUrl}/orders`, { params: { user_id } })
      .then(({ data }) => {
        setOrders(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getOrder: GetOrder = (id) => {
    return axios.get<Order>(`${requestUrl}/orders/${id}`).then(({ data }) => data)
  }

  const value = {
    createOrder,
    getOrders,
    orders,
    getOrder,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
