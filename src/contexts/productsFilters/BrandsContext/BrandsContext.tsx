import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import { requestUrl } from '../../../env'
import { Brand, BrandsContextProps, CreateBrand, EditBrand, GetBrands } from './types'
import { BaseDeleteFilter, BaseGetFilter } from '../types'

const BrandsContext = React.createContext<BrandsContextProps>({} as BrandsContextProps)

export const useBrands = () => useContext(BrandsContext)

type Props = {
  children: ReactNode
}

export const BrandsProvider: React.FC<Props> = ({ children }) => {
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

  const getBrand: BaseGetFilter = (id) => axios.get<Brand>(`${requestUrl}/brands/${id}`).then(({ data }) => data)

  const deleteBrand: BaseDeleteFilter = (id) => axios.delete(`${requestUrl}/brands/${id}`)

  const value = {
    getBrands,
    createBrand,
    editBrand,
    getBrand,
    deleteBrand,
  }

  return <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
}
