import React, { ReactElement, useContext } from 'react'
import axios from 'axios'

import { ProductsContextProps } from './types'
import requestUrl from '../../requestUrl'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

type Props = {
  children: ReactElement
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const getProducts = () => {
    return axios.get(`${requestUrl}/products`)
      .then((response) => {
        // refreshToken(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const value = {}

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
