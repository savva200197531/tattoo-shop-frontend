import React, { ReactNode, useContext, useState } from 'react'

import { CreateOrder, GetOrders, Order, OrdersContextProps } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const OrdersContext = React.createContext<OrdersContextProps>({} as OrdersContextProps)

export const useOrders = () => useContext(OrdersContext)

type Props = {
  children: ReactNode
}

export const OrdersProvider: React.FC<Props> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([])

  const createOrder: CreateOrder = (payload) => axios.post(`${requestUrl}/orders`, payload)

  const getOrders: GetOrders = (user_id) => {
    return axios.get<Order[]>(`${requestUrl}/orders/${user_id}`)
      .then(({ data }) => {
        setOrders(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    createOrder,
    getOrders,
    orders,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
