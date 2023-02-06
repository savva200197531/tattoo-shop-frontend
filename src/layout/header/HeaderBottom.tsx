import React from 'react'
import { ListItem } from '../../types/list-item'
import { Button } from '@mui/material'
import Catalog from '../catalog/Catalog'

const HeaderBottom = () => {
  const items: ListItem[] = [
    {
      element: <Catalog />,
      customElement: true,
    },
    {
      element: 'Новинки',
    },
    {
      element: 'Отзывы',
    },
    {
      element: 'Доставка и оплата',
    },
    {
      element: 'О нас',
    },
  ]

  return (
    <div className="header-bottom">
      <div className="container">
        <div className="header-items">
          {items.map(({ element, customElement, onClick }, index) => (
            <div className="header-item" key={index}>
              {
                customElement ? element : (
                  <Button color="secondary" onClick={onClick}>{element}</Button>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
