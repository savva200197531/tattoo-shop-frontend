import React, { ReactNode, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { CreateOrder, GetAllOrders, GetOrder, GetOrders, Order, OrdersContextProps } from './types'
import { requestUrl } from '../../env'
import { useAlert } from '../alert/AlertContext'
import { formatError } from '../../helpers/formatters/formatError'

const OrdersContext = React.createContext<OrdersContextProps>({} as OrdersContextProps)

export const useOrders = () => useContext(OrdersContext)

type Props = {
  children: ReactNode
}

export const OrdersProvider: React.FC<Props> = ({ children }) => {
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const createOrder: CreateOrder = (payload) => {
    return axios.post<Order>(`${requestUrl}/orders`, payload)
      .then(({ data }) => {
        navigate(`/thanks/${data.id}`)
      })
      .catch(error => {
        const message = formatError(error)

        showAlert({ text: message, severity: 'error' })
      })
  }

  const getOrders: GetOrders = (user_id) => {
    return axios.get<Order[]>(`${requestUrl}/orders`, { params: { user_id } }).then(({ data }) => data)
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
    getOrder,
    getAllOrders,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
