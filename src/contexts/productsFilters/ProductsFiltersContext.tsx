import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { requestUrl } from '../../env'
import {
  BaseDeleteFilter,
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
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

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

  // BRANDS
  const getBrands: GetBrands = (category_id) => {
    return axios.get<Brand[]>(`${requestUrl}/brands`, { params: { category_id } })
      .then((response) => {
        setBrands(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const createBrand: CreateBrand = (payload) => {
    return axios.post(`${requestUrl}/brands`, payload)
      .catch(error => {
        console.log(error)
      })
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
    categories,

    // BRANDS
    getBrands,
    createBrand,
    editBrand,
    deleteBrand,
    brands,
  }

  return <ProductsFiltersContext.Provider value={value}>{children}</ProductsFiltersContext.Provider>
}
