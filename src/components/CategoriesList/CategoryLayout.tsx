import React from 'react'

import { Typography } from '@mui/material'

import { imgSrc } from '../../helpers/imgSrc'
import { CategoryLayoutProps } from './types'

const CategoryLayout: React.FC<CategoryLayoutProps> = ({ category, children, onClick }) => {
  return (
    <div onClick={() => onClick(category)} className="category" style={{ backgroundImage: `url(${imgSrc(category.img_id)})` }}>
      {children?.(category)}
      <Typography className="category-title" variant="h5" component="h6" textAlign="center">
        {category.name}
      </Typography>
    </div>
  )
}

export default CategoryLayout
