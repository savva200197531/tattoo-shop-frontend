import React, { ReactNode, useContext, useState } from 'react'

import { AddToCart, Cart, CartContextProps, DeleteFromCart } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactNode
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({} as Cart)

  const getCartItems = (user_id: number) => {
    return axios.get<Cart>(`${requestUrl}/cart/${user_id}`)
      .then((response) => {
        setCart(response.data)
      })
  }

  const addToCart: AddToCart = ({ user_id, ...payload }) => axios.put(`${requestUrl}/cart/${user_id}`, payload)

  const deleteFromCart: DeleteFromCart = (id) => axios.delete(`${requestUrl}/cart/${id}`)

  const value = {
    cart,
    getCartItems,
    addToCart,
    deleteFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
