import React from 'react'
import { Category } from '../../contexts/productsFilters/CategoriesContext/types'

export type NavigateToCategory = (id?: number) => void

export type BaseProps = {
  children?: (category: Category) => React.ReactElement
}

export type CategoryLayoutProps = BaseProps & {
  id?: number
  name: string
  imgSrc: string
  onClick: NavigateToCategory
}
