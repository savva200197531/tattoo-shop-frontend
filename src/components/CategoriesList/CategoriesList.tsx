import React from 'react'
import { createSearchParams, useNavigate, URLSearchParamsInit } from 'react-router-dom'

import Spinner from '../Spinner/Spinner'
import { useCategories } from '../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import CategoryLayout from './CategoryLayout'
import { BaseProps, NavigateToCategory } from './types'
import CategoryLayoutMobile from './CategoryLayoutMobile'
import './desktop.scss'
import './mobile.scss'
import { imgSrc } from '../../helpers/imgSrc'

type Props = BaseProps & {
  mobile?: boolean
  disabled?: boolean
}

const CategoriesList: React.FC<Props> = ({ disabled, mobile = false, children }) => {
  const navigate = useNavigate()
  const { categories, loading } = useCategories()

  const handleClick: NavigateToCategory = (id) => {
    if (disabled) return

    const searchParams: URLSearchParamsInit = {
      page: '1',
      limit: '16',
    }

    if (id) {
      searchParams.category = id.toString()
    }

    navigate({
      pathname: '/products',
      search: createSearchParams(searchParams).toString(),
    })
  }

  const LayoutComponent = mobile ? CategoryLayoutMobile : CategoryLayout

  return loading ? <Spinner/> : (
    <div className={`categories-list${mobile ? '-mobile' : ''}`}>
      {categories.map(category => (
        <LayoutComponent
          key={category.id}
          onClick={handleClick}
          id={category.id}
          imgSrc={imgSrc(category.img_id)}
          name={category.name}
        >
          {children}
        </LayoutComponent>
      ))}
      <LayoutComponent
        name="Все товары"
        imgSrc=""
        onClick={() => {
          navigate({
            pathname: '/products',
            search: createSearchParams({
              page: '1',
              limit: '16',
            }).toString(),
          })
        }}
      >
        {children}
      </LayoutComponent>
    </div>
  )
}

export default CategoriesList
