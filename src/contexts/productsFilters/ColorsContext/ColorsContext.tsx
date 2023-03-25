import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import { requestUrl } from '../../../env'
import { Color, ColorsContextProps, CreateColor, EditColor, GetColors } from './types'
import { BaseDeleteFilter, BaseGetFilter } from '../types'

const ColorsContext = React.createContext<ColorsContextProps>({} as ColorsContextProps)

export const useColors = () => useContext(ColorsContext)

type Props = {
  children: ReactNode
}

export const ColorsProvider: React.FC<Props> = ({ children }) => {
  const getColors: GetColors = (filter) => {
    return axios.get<Color[]>(`${requestUrl}/colors`, { params: filter }).then(({ data }) => data)
  }

  const createColor: CreateColor = (payload) => {
    return axios.post<Color>(`${requestUrl}/colors`, payload)
  }

  const editColor: EditColor = (id, payload) => {
    return axios.patch(`${requestUrl}/colors/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const getColor: BaseGetFilter = (id) => axios.get<Color>(`${requestUrl}/colors/${id}`).then(({ data }) => data)

  const deleteColor: BaseDeleteFilter = (id) => axios.delete(`${requestUrl}/colors/${id}`)

  const value = {
    getColors,
    createColor,
    editColor,
    getColor,
    deleteColor,
  }

  return <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
}
