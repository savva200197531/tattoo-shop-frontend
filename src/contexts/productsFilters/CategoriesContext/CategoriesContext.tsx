import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import { requestUrl } from '../../../env'
import { CategoriesContextProps, Category, CreateCategory, EditCategory } from './types'
import { BaseDeleteFilter, BaseGetFilter, BaseGetFilters } from '../types'

const CategoriesContext = React.createContext<CategoriesContextProps>({} as CategoriesContextProps)

export const useCategories = () => useContext(CategoriesContext)

type Props = {
  children: ReactNode
}

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const getCategories: BaseGetFilters = () => {
    return axios.get<Category[]>(`${requestUrl}/categories`).then(({ data }) => data)
  }

  const createCategory: CreateCategory = (payload) => {
    return axios.post(`${requestUrl}/categories`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const editCategory: EditCategory = (id, payload) => {
    return axios.patch(`${requestUrl}/categories/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const deleteCategory: BaseDeleteFilter = (id) => axios.delete(`${requestUrl}/categories/${id}`)

  const getCategory: BaseGetFilter = (id) => axios.get<Category>(`${requestUrl}/categories/${id}`).then(({ data }) => data)

  const value = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,
  }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
