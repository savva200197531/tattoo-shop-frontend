import React, { ReactNode, useContext, useState } from 'react'

import { AddToFavorite, DeleteFromFavorite, Favorite, FavoriteContextProps, GetFavoriteProducts } from './types'
import axios from 'axios'
import { requestUrl } from '../../env'

const FavoriteContext = React.createContext<FavoriteContextProps>({} as FavoriteContextProps)

export const useFavorite = () => useContext(FavoriteContext)

type Props = {
  children: ReactNode
}

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Favorite[]>([])

  const getFavoriteProducts: GetFavoriteProducts = (user_id: number) => {
    // setLoading(true)
    return axios.get<Favorite[]>(`${requestUrl}/favorite/${user_id}`)
      .then((response) => {
        setFavoriteProducts(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addToFavorite: AddToFavorite = ({ user_id, ...payload }) => axios.post(`${requestUrl}/favorite/${user_id}`, payload)

  const deleteFromFavorite: DeleteFromFavorite = (id) => {
    return axios.delete(`${requestUrl}/favorite/${id}`)
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    favoriteProducts,
    getFavoriteProducts,
    addToFavorite,
    deleteFromFavorite,
  }

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}
