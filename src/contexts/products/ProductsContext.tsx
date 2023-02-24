import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
  GetProduct,
  GetProducts,
  Product, ProductsMeta,
  ProductsContextProps, ProductsLinks, GetProductsResponse,
} from './types'
import { requestUrl } from '../../env'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

type Props = {
  children: ReactNode
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [productsMeta, setProductsMeta] = useState<ProductsMeta>({} as ProductsMeta)
  const [productsLinks, setProductsLinks] = useState<ProductsLinks>({} as ProductsLinks)

  const getProducts: GetProducts = (params, filters) => {
    return axios.get<GetProductsResponse>(`${requestUrl}/products`, {
      params: {
        ...params,
        [`filter.category_id`]: filters?.category_id,
        [`filter.brand_id`]: filters?.brand_id,
      },
    })
      .then(({ data }) => {
        setProducts(data.data)
        setProductsLinks(data.links)
        setProductsMeta(data.meta)
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
    products,
    productsMeta,
    productsLinks,
    getProducts,
    createProduct,
    deleteProduct,
    getProduct,
    editProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
