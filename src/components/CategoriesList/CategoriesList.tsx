import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import Spinner from '../Spinner/Spinner'
import { useCategories } from '../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import CategoryLayout from './CategoryLayout'
import { BaseProps, NavigateToCategory } from './types'
import CategoryLayoutMobile from './CategoryLayoutMobile'
import './desctop.scss'
import './mobile.scss'

type Props = BaseProps & {
  mobile?: boolean
  disabled?: boolean
}

const CategoriesList: React.FC<Props> = ({ disabled, mobile = false, children }) => {
  const navigate = useNavigate()
  const { categories, loading } = useCategories()

  const handleClick: NavigateToCategory = (category) => {
    if (disabled) return
    navigate({
      pathname: '/products',
      search: createSearchParams({
        page: '1',
        limit: '15',
        category: category.id.toString(),
      }).toString(),
    })
  }

  const LayoutComponent = mobile ? CategoryLayoutMobile : CategoryLayout

  return loading ? <Spinner/> : (
    <div className={`categories-list${mobile ? '-mobile' : ''}`}>
      {categories.map(category => (
        <LayoutComponent key={category.id} category={category} onClick={handleClick}>{children}</LayoutComponent>
      ))}
    </div>
  )
}

export default CategoriesList
