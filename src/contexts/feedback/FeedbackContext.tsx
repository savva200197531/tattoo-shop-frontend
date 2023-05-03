import React, { ReactNode, useContext } from 'react'

import { FeedbackContextProps, SendFeedback } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const FeedbackContext = React.createContext<FeedbackContextProps>({} as FeedbackContextProps)

export const useFeedback = () => useContext(FeedbackContext)

type Props = {
  children: ReactNode
}

export const FeedbackProvider: React.FC<Props> = ({ children }) => {
  const sendFeedback: SendFeedback = (payload) => {
    return axios.post(`${requestUrl}/feedback`, payload)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    sendFeedback,
  }

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>
}
