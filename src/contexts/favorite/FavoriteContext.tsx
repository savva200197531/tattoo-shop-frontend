import React, { ReactNode, useContext, useEffect, useState } from 'react'

import {
  AddToFavorite,
  Favorite,
  FavoriteContextProps,
  FindFavoriteByProductId,
  GetFavoriteProducts,
} from './types'
import axios from 'axios'
import { requestUrl } from '../../env'
import { useAuth } from '../auth/AuthContext'

const FavoriteContext = React.createContext<FavoriteContextProps>({} as FavoriteContextProps)

export const useFavorite = () => useContext(FavoriteContext)

type Props = {
  children: ReactNode
}

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [favoriteProducts, setFavoriteProducts] = useState<Favorite[]>([])

  const { isUserExist, user } = useAuth()

  const findFavoriteByProductId: FindFavoriteByProductId = (product_id) => {
    return favoriteProducts.find(favoriteProduct => favoriteProduct.product.id === product_id)
  }

  const getFavoriteProducts: GetFavoriteProducts = (user_id: number) => {
    setLoading(true)
    return axios.get<Favorite[]>(`${requestUrl}/favorite/${user_id}`)
      .then((response) => {
        setFavoriteProducts(response.data)
      })
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addToFavorite: AddToFavorite = ({ user_id, ...payload }) => {
    return axios.post(`${requestUrl}/favorite/${user_id}`, payload).then(({ data }) => {
      setFavoriteProducts(data)
    })
  }

  // const deleteFromFavorite: DeleteFromFavorite = (id) => {
  //   return axios.delete(`${requestUrl}/favorite/${id}`)
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  useEffect(() => {
    if (isUserExist) {
      getFavoriteProducts(user.id)
    }
  }, [isUserExist])

  const value = {
    favoriteProducts,
    getFavoriteProducts,
    addToFavorite,
    findFavoriteByProductId,
    loading,
  }

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}
