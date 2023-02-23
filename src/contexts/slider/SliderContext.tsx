import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { CreateSlide, DeleteSlide, EditSlide, GetSlides, Slide, SliderContextProps } from './types'
import { requestUrl } from '../../env'

const SliderContext = React.createContext<SliderContextProps>({} as SliderContextProps)

export const useSlider = () => useContext(SliderContext)

type Props = {
  children: ReactNode
}

export const SliderProvider: React.FC<Props> = ({ children }) => {
  const [slides, setSlides] = useState<Slide[]>([])

  const getSlides: GetSlides = () => {
    return axios.get<Slide[]>(`${requestUrl}/slider`)
      .then((response) => {
        setSlides(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const createSlide: CreateSlide = (payload) => {
    return axios.post(`${requestUrl}/slider`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const editSlide: EditSlide = (id, payload) => {
    return axios.patch(`${requestUrl}/slider/${id}`, payload)
      .catch(error => {
        console.log(error)
      })
  }

  const deleteSlide: DeleteSlide = (id) => axios.delete(`${requestUrl}/slider/${id}`)

  const value = {
    slides,
    getSlides,
    createSlide,
    deleteSlide,
    editSlide,
  }

  return <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
}
