import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { requestUrl } from '../../env'
import {
  BaseDeleteFilter,
  BaseGetFilters,
  Category,
  CreateCategory,
  EditCategory,
  ProductsFiltersContextProps,
} from './types'

const ProductsFiltersContext = React.createContext<ProductsFiltersContextProps>({} as ProductsFiltersContextProps)

export const useProductsFilters = () => useContext(ProductsFiltersContext)

type Props = {
  children: ReactNode
}

export const ProductsFiltersProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  // CATEGORIES
  const getCategories: BaseGetFilters = () => {
    return axios.get<Category[]>(`${requestUrl}/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
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

  const value = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
    categories,
  }

  return <ProductsFiltersContext.Provider value={value}>{children}</ProductsFiltersContext.Provider>
}
