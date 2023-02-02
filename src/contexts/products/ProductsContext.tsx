import React, { ReactNode, useContext, useEffect, useState } from 'react'
import axios, { all } from 'axios'

import { CreateProduct, DeleteProduct, Product, ProductsContextProps } from './types'
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

  const getProductImages = (id: number) => {
    return axios.get(`${requestUrl}/files/${id}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

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

  useEffect(() => {
    // products.forEach(product => {
    //   all(product.images?.map(img => getProductImages(img.id))).then((response) => {
    //     console.log(response)
    //   })
    // })
    getProductImages(17).then(res => {
      console.log(res)
    })
  }, [products])

  const value = {
    getProducts,
    createProduct,
    products,
    deleteProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
