import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
  GetProduct,
  GetProducts,
  Product,
  ProductsContextProps, GetProductsResponse, GetPriceRange, GetProductsWithSearch,
} from './types'
import { requestUrl } from '../../env'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

type Props = {
  children: ReactNode
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const getProducts: GetProducts = (params, filters) => {
    return axios.get<GetProductsResponse>(`${requestUrl}/products`, {
      params: {
        ...params,
        [`filter.category_id`]: filters?.category_id,
        [`filter.brand_id`]: filters?.brand_id,
        [`filter.price_min`]: filters?.price_min,
        [`filter.price_max`]: filters?.price_max,
        [`filter.search`]: filters?.search,
        [`filter.color`]: filters?.color,
        [`filter.amount`]: filters?.amount,
      },
    }).then(({ data }) => data)
  }

  const getProductsWithSearch: GetProductsWithSearch = (search) => {
    return axios.get<Product[]>(`${requestUrl}/products/search`, {
      params: { search },
    }).then(({ data }) => data)
  }

  const getProduct: GetProduct = (id) => {
    return axios.get<Product>(`${requestUrl}/products/${id}`).then(({ data }) => data)
  }

  const createProduct: CreateProduct = (payload) => {
    return axios.post(`${requestUrl}/products`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const editProduct: EditProduct = (id, payload) => {
    return axios.patch(`${requestUrl}/products/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const deleteProduct: DeleteProduct = (id) => axios.delete(`${requestUrl}/products/${id}`)

  const getPriceRange: GetPriceRange = (filter) =>
    axios.get(`${requestUrl}/products/price-range`, {
      params: filter,
    }).then(({ data }) => data)

  const value = {
    getProducts,
    createProduct,
    deleteProduct,
    getProduct,
    editProduct,
    getPriceRange,
    getProductsWithSearch,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
