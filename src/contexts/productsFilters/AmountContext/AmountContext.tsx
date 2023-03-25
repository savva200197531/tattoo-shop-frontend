import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import { requestUrl } from '../../../env'
import { Amount, AmountsContextProps, CreateAmount, EditAmount, GetAmounts } from './types'
import { BaseDeleteFilter, BaseGetFilter } from '../types'

const AmountContext = React.createContext<AmountsContextProps>({} as AmountsContextProps)

export const useAmount = () => useContext(AmountContext)

type Props = {
  children: ReactNode
}

export const AmountProvider: React.FC<Props> = ({ children }) => {
  const getAmounts: GetAmounts = (filter) => {
    return axios.get<Amount[]>(`${requestUrl}/amount`, { params: filter }).then(({ data }) => data)
  }

  const createAmount: CreateAmount = (payload) => {
    return axios.post<Amount>(`${requestUrl}/amount`, payload)
  }

  const editAmount: EditAmount = (id, payload) => {
    return axios.patch(`${requestUrl}/amount/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const getAmount: BaseGetFilter = (id) => axios.get<Amount>(`${requestUrl}/amount/${id}`).then(({ data }) => data)

  const deleteAmount: BaseDeleteFilter = (id) => axios.delete(`${requestUrl}/amount/${id}`)

  const value = {
    getAmounts,
    createAmount,
    editAmount,
    getAmount,
    deleteAmount,
  }

  return <AmountContext.Provider value={value}>{children}</AmountContext.Provider>
}
