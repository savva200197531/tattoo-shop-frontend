import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import { CreateSlide, DeleteSlide, Slide, SliderContextProps } from './types'
import { requestUrl } from '../../env'

const SliderContext = React.createContext<SliderContextProps>({} as SliderContextProps)

export const useSlider = () => useContext(SliderContext)

type Props = {
  children: ReactNode
}

export const SliderProvider: React.FC<Props> = ({ children }) => {
  const [slides, setSlides] = useState<Slide[]>([])

  const getSlides = () => {
    return axios.get<Slide[]>(`${requestUrl}/slider`)
      .then((response) => {
        setSlides(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const createSlide: CreateSlide = ({ img, title, description, bg_color }) => {
    const formData = new FormData()

    if (img) {
      formData.append('img', img, img.name)
    }

    formData.append('title', title)
    formData.append('description', description)
    formData.append('bg_color', bg_color)

    return axios.post(`${requestUrl}/slider`, formData)
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
  }

  return <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
}
