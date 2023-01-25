import React, { ReactNode, useContext, useState } from 'react'

import { AddToCart, CartContextProps, CartItem, DeleteFromCart } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactNode
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const getCartItems = (user_id: number) => {
    // setLoading(true)
    return axios.get<CartItem[]>(`${requestUrl}/cart/${user_id}`)
      .then((response) => {
        setCartItems(response.data)
      })
      .finally(() => {
        // setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addToCart: AddToCart = ({ user_id, ...payload }) => {
    return axios.put(`${requestUrl}/cart/${user_id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const deleteFromCart: DeleteFromCart = (id) => {
    return axios.delete(`${requestUrl}/cart/${id}`)
      .catch(error => {
        console.log(error)
      })
  }

  const getCartItemsCount = (): number => cartItems.reduce((p, c) => p + c.count, 0)

  const value = {
    cartItems,
    getCartItems,
    addToCart,
    getCartItemsCount,
    deleteFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
