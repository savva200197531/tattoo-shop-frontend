import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { CreateProduct, DeleteProduct, Product, ProductsContextProps } from './types'
import requestUrl from '../../requestUrl'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

type Props = {
  children: ReactNode
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = () => {
    return axios.get<Product[]>(`${requestUrl}/products`)
      .then((response) => {
        // refreshToken(response.data)
        setProducts(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const createProduct: CreateProduct = (payload) => {
    return axios.post(`${requestUrl}/products`, payload)
      .then(() => {
        getProducts()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteProduct: DeleteProduct = (id) => {
    return axios.delete(`${requestUrl}/products/${id}`)
      .then(() => {
        getProducts()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const value = {
    getProducts,
    createProduct,
    products,
    deleteProduct
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
