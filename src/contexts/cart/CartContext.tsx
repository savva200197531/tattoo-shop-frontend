import React, { ReactNode, useContext, useState } from 'react'

import { AddToCart, CartContextProps, CartItem } from './types'
import axios from 'axios'
import requestUrl from '../../requestUrl'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactNode
}

export const CartProvider: React.FC<Props> = ({ children }) => {

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const userId = localStorage.getItem('alisa-kisa-user-id')

  const getCartItems = () => {
    return axios.get<CartItem[]>(`${requestUrl}/cart/${userId}`)
      .then((response) => {
        setCartItems(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // const addCartItem: AddCartItem = (payload) => {
  //   return axios.put(`${requestUrl}/cart/${userId}/add`, payload)
  //     .then((response) => {
  //       getCartItems()
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
  //
  // const removeCartItem: RemoveCartItem = (payload) => {
  //   return axios.patch(`${requestUrl}/cart/${userId}/remove`, payload)
  //     .then((response) => {
  //       getCartItems()
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  const addToCart: AddToCart = (payload) => {
    return axios.put(`${requestUrl}/cart/${userId}/add`, payload)
      .then(() => {
        getCartItems()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    cartItems,
    getCartItems,
    addToCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
