import React, { ReactElement, useContext } from 'react'

import { CartContextProps } from './types'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactElement
}

export const CartProvider: React.FC<Props> = ({ children }) => {


  const value = {}

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
