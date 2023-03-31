import React, { ReactNode, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import {
  AddToCart,
  AddToLocalCart,
  Cart,
  CartContextProps,
  CartItem,
  DeleteFromCart,
  DeleteFromLocalCart,
  FindCartItemByProductId,
  GetLocalCartItems,
} from './types'
import { requestUrl } from '../../env'
import { local } from '../../App'
import { useAuth } from '../auth/AuthContext'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactNode
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<Cart>({} as Cart)

  const { isUserExist, setUser, user } = useAuth()

  const findCartItemByProductId: FindCartItemByProductId = (product_id) => {
    return cart.items?.find(cartItem => cartItem.product.id === product_id)
  }

  const getCartItems = (user_id: number) => {
    setLoading(true)
    return axios.get<Cart>(`${requestUrl}/cart/${user_id}`)
      .then((response) => {
        setCart(response.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addToCart: AddToCart = ({ user_id, ...payload }) => {
    return axios.put(`${requestUrl}/cart/${user_id}`, payload).then(({ data }) => {
      setCart(data)
    })
  }

  const deleteFromCart: DeleteFromCart = (id) => axios.delete(`${requestUrl}/cart/${id}`)

  const getLocalCartItems: GetLocalCartItems = () => {
    const localCartStr = local.getItem('cart')

    if (localCartStr) {
      const { items }: Cart = JSON.parse(localCartStr)

      if (!items.length) {
        local.removeItem('cart')
        setUser({
          ...user,
          cart: [],
        })
        setCart({} as Cart)
      }

      setUser({
        ...user,
        cart: items,
      })

      setCart({
        items,
        totalPrice: items.reduce((p, c) => p + c.price, 0),
        totalProductsCount: items.reduce((p, c) => p + c.count, 0),
      })
    }
  }

  const addToLocalCart: AddToLocalCart = async ({ count, product }) => {
    const duplicatedCartItem = cart.items?.find(item => item.product.id === product.id)

    if (count > product.count) {
      return
    }

    if (duplicatedCartItem) {
      if (count === 0) {
        local.setItem('cart', JSON.stringify({
          ...cart,
          items: cart.items.filter(item => item.id !== duplicatedCartItem.id),
        }))

        return getLocalCartItems()
      }

      if (count === duplicatedCartItem.count) {
        return
      }

      local.setItem('cart', JSON.stringify({
        ...cart,
        items: cart.items.map(item => {
          if (item.id === duplicatedCartItem.id) {
            return {
              ...item,
              count,
              price: product.price * count,
            }
          }
          return item
        }),
      }))

      return getLocalCartItems()
    } else {
      const id = new Date().getUTCMilliseconds()

      const cartItem: CartItem = {
        id,
        count,
        product,
        price: product.price * count,
      }

      const cartItems = cart.items || []

      cartItems.unshift(cartItem)

      local.setItem('cart', JSON.stringify({
        ...cart,
        items: cartItems,
      }))

      return getLocalCartItems()
    }
  }

  const deleteFromLocalCart: DeleteFromLocalCart = (id) => {
    local.setItem('cart', JSON.stringify({
      ...cart,
      items: cart.items.filter(item => item.id !== id),
    }))

    getLocalCartItems()
  }

  useEffect(() => {
    if (!isUserExist) {
      getLocalCartItems()
    } else {
      getCartItems(user.id)
    }
  }, [isUserExist])

  const value = {
    cart,
    getCartItems,
    addToCart,
    deleteFromCart,
    getLocalCartItems,
    addToLocalCart,
    deleteFromLocalCart,
    findCartItemByProductId,
    loading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
