import React, { ReactNode, useContext } from 'react'

import { CreatePayment, PaymentContextProps } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const PaymentContext = React.createContext<PaymentContextProps>({} as PaymentContextProps)

export const usePayment = () => useContext(PaymentContext)

type Props = {
  children: ReactNode
}

export const PaymentProvider: React.FC<Props> = ({ children }) => {
  const createPayment: CreatePayment = (payload) => {
    return axios.post(`${requestUrl}/payment`, payload)
      .then(({ data }) => {
        window.open(data.confirmation.confirmation_url, '_blank')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    createPayment,
  }

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}
