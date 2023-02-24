import React from 'react'
import { Category } from '../../contexts/productsFilters/types'
import { imgSrc } from '../../helpers/imgSrc'
import './styles.scss'
import { Typography } from '@mui/material'
import { createSearchParams, useNavigate } from 'react-router-dom'

type Props = {
  category: Category
  children?: React.ReactElement
  disabled?: boolean
}

const CategoryLayout: React.FC<Props> = ({ category, children, disabled = false }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (disabled) return
    navigate({
      pathname: '/products',
      search: createSearchParams({
        page: '1',
        limit: '10',
        category: category.id.toString(),
      }).toString(),
    })
  }

  return (
    <div onClick={handleClick} className="category" style={{ backgroundImage: `url(${imgSrc(category.img_id)})` }}>
      {children}
      <Typography className="category-title" variant="h5" component="h6" textAlign="center">
        {category.name}
      </Typography>
    </div>
  )
}

export default CategoryLayout
