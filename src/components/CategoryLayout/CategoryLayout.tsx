import React from 'react'
import { Category } from '../../contexts/productsFilters/types'
import { imgSrc } from '../../helpers/imgSrc'
import './styles.scss'
import { Typography } from '@mui/material'

type Props = {
  category: Category
  children: React.ReactElement
}

const CategoryLayout: React.FC<Props> = ({ category, children }) => {
  return (
    <div className="category" style={{ backgroundImage: `url(${imgSrc(category.img_id)})` }}>
      {children}
      <Typography className="category-title" variant="h5" component="h6" textAlign="center">
        {category.name}
      </Typography>
    </div>
  )
}

export default CategoryLayout
