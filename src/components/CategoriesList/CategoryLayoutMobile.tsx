import React from 'react'

import { imgSrc } from '../../helpers/imgSrc'
import { CategoryLayoutProps } from './types'

const CategoryLayoutMobile: React.FC<CategoryLayoutProps> = ({ category, onClick }) => {
  return (
    <div onClick={() => onClick(category)} className="category-mobile">
      <div className="category-mobile__img" style={{ backgroundImage: `url(${imgSrc(category.img_id)})` }} />
      <p className="category-mobile__text">{category.name}</p>
    </div>
  )
}

export default CategoryLayoutMobile
