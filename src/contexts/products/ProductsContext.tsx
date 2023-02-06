import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { CreateProduct, DeleteProduct, GetProduct, Product, ProductImgSrc, ProductsContextProps } from './types'
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

  const productImgSrc: ProductImgSrc = (id: number) => `${requestUrl}/files/product-img/${id}`

  const createProduct: CreateProduct = ({ images, price, name, count }) => {
    const formData = new FormData()

    if (images?.length) {
      images.forEach(img => {
        formData.append('images', img, img.name)
      })
    }

    formData.append('name', name)
    formData.append('price', price.toString())
    formData.append('count', count.toString())

    return axios.post(`${requestUrl}/products`, formData)
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
    productImgSrc,
    getProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
