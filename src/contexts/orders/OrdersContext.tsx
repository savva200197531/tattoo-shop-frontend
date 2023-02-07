import React, { ReactNode, useContext } from 'react'

import { CreateOrder, OrdersContextProps } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const OrdersContext = React.createContext<OrdersContextProps>({} as OrdersContextProps)

export const useOrders = () => useContext(OrdersContext)

type Props = {
  children: ReactNode
}

export const OrdersProvider: React.FC<Props> = ({ children }) => {
  const createOrder: CreateOrder = (payload) => {
    return axios.post(`${requestUrl}/orders`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    createOrder,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
