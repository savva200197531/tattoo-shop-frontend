import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { CreateProduct, DeleteProduct, EditProduct, GetProduct, Product, ProductsContextProps } from './types'
import { requestUrl } from '../../env'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

type Props = {
  children: ReactNode
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = () => {
    return axios.get<Product[]>(`${requestUrl}/products`)
      .then(({ data }) => {
        setProducts(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getProduct: GetProduct = (id) => axios.get<Product>(`${requestUrl}/products/${id}`)

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

  const value = {
    getProducts,
    createProduct,
    products,
    deleteProduct,
    getProduct,
    editProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
