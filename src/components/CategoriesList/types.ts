import React from 'react'
import { Category } from '../../contexts/productsFilters/CategoriesContext/types'

export type NavigateToCategory = (category: Category) => void

export type BaseProps = {
  children?: (category: Category) => React.ReactElement
}

export type CategoryLayoutProps = BaseProps & {
  category: Category
  onClick: NavigateToCategory
}
