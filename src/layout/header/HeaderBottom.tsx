import React from 'react'
import { ListItem } from '../../types/list-item'
import { Button } from '@mui/material'
import Catalog from '../catalog/Catalog'
import { createSearchParams, useNavigate } from 'react-router-dom'

const HeaderBottom = () => {
  const navigate = useNavigate()

  const items: ListItem[] = [
    {
      element: <Catalog />,
      customElement: true,
    },
    {
      element: 'Новинки',
      onClick: () => {
        navigate({
          pathname: '/products',
          search: createSearchParams({
            page: '1',
            limit: '10',
            sort: 'created_at:DESC',
          }).toString(),
        })
      },
    },
    // {
    //   element: 'Отзывы',
    // },
    {
      element: 'Доставка и оплата',
      onClick: () => navigate('/delivery'),
    },
    {
      element: 'О нас',
      onClick: () => navigate('/about'),
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
