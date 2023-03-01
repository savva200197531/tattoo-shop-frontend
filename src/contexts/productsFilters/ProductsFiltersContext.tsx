import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import { requestUrl } from '../../env'
import {
  BaseDeleteFilter, BaseGetFilter,
  BaseGetFilters, Brand,
  Category, CreateBrand,
  CreateCategory, EditBrand,
  EditCategory, GetBrands,
  ProductsFiltersContextProps,
} from './types'

const ProductsFiltersContext = React.createContext<ProductsFiltersContextProps>({} as ProductsFiltersContextProps)

export const useProductsFilters = () => useContext(ProductsFiltersContext)

type Props = {
  children: ReactNode
}

export const ProductsFiltersProvider: React.FC<Props> = ({ children }) => {
  // CATEGORIES
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

  const getCategory: BaseGetFilter = (id) => axios.get<Category[]>(`${requestUrl}/categories/${id}`).then(({ data }) => data)

  // BRANDS
  const getBrands: GetBrands = (filter) => {
    return axios.get<Brand[]>(`${requestUrl}/brands`, { params: filter }).then(({ data }) => data)
  }

  const createBrand: CreateBrand = (payload) => {
    return axios.post<Brand>(`${requestUrl}/brands`, payload)
  }

  const editBrand: EditBrand = (id, payload) => {
    return axios.patch(`${requestUrl}/brands/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBrand: BaseDeleteFilter = (id) => axios.delete(`${requestUrl}/brands/${id}`)

  const value = {
    // CATEGORIES
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,

    // BRANDS
    getBrands,
    createBrand,
    editBrand,
    deleteBrand,
  }

  return <ProductsFiltersContext.Provider value={value}>{children}</ProductsFiltersContext.Provider>
}
