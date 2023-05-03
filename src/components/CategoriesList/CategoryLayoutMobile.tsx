import React from 'react'

import { CategoryLayoutProps } from './types'

const CategoryLayoutMobile: React.FC<CategoryLayoutProps> = ({ id, name, imgSrc, onClick }) => {
  return (
    <div onClick={() => onClick(id)} className="category-mobile">
      <div className="category-mobile__img" style={{ backgroundImage: `url(${imgSrc})` }} />
      <p className="category-mobile__text">{name}</p>
    </div>
  )
}

export default CategoryLayoutMobile
