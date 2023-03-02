import React, { ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { CreateOrder, CreateOrderResponse, GetAllOrders, GetOrder, GetOrders, Order, OrdersContextProps } from './types'
import { requestUrl } from '../../env'

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

  const getAllOrders: GetAllOrders = () => {
    return axios.get<Order[]>(`${requestUrl}/orders/all`).then(({ data }) => data)
  }

  const getOrder: GetOrder = (id, user_id) => {
    return axios.get<Order>(`${requestUrl}/orders/${id}`, { params: { user_id } }).then(({ data }) => data)
  }

  const value = {
    createOrder,
    getOrders,
    orders,
    getOrder,
    getAllOrders,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
