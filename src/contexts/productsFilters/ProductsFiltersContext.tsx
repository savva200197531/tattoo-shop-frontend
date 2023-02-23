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

const baseRequestUrl = `${requestUrl}/products-filters`

export const ProductsFiltersProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories: BaseGetFilters = () => {
    return axios.get<Category[]>(`${baseRequestUrl}/category`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const createCategory: CreateCategory = (payload) => {
    return axios.post(`${baseRequestUrl}/category`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const editCategory: EditCategory = (id, payload) => {
    return axios.patch(`${baseRequestUrl}/category/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const deleteCategory: BaseDeleteFilter = (id) => axios.delete(`${baseRequestUrl}/category/${id}`)

  const value = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
    categories,
  }

  return <ProductsFiltersContext.Provider value={value}>{children}</ProductsFiltersContext.Provider>
}
