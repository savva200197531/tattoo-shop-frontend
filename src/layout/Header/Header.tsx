import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import './style.scss'
import SearchField from '../../components/SearchField/SearchField'
import { ListItem } from '../../types/list-item'
import Svg from '../../components/Svg'

const Header = () => {
  const navigate = useNavigate()

  const topItems: ListItem[] = [
    {
      element: 'phone',
    },
    {
      element: 'instagram',
    },
    {
      element: 'telegram',
    },
    {
      element: <SearchField/>,
      customElement: true,
      style: {
        width: '100%',
      },
    },
    {
      element: 'profile',
      onClick: () => navigate('profile'),
    },
    {
      element: 'hearth',
    },
    {
      element: 'cart',
      onClick: () => navigate('cart'),
    },
  ]

  const bottomItems: ListItem[] = [
    {
      element: 'burger',
      customElement: true,
    },
    {
      element: 'Каталог',
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
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">

          <Button onClick={() => navigate('/')}>Logo</Button>

          <div className="header-items header-items__top">
            {topItems.map(({ element, customElement, onClick, style }, index) => (

              <div className="header-item" style={style} key={index}>
                {customElement ? element : (
                  <IconButton onClick={onClick} type="button" sx={{ p: '6px' }} aria-label="search">
                    <Svg className="header-icon" id={element as string} />
                  </IconButton>
                )}
              </div>
            ))}
          </div>

          <div className="header-items header-items__bottom">
            {bottomItems.map(({ element, customElement, onClick }, index) => (
              <div className="header-item" key={index}>
                {
                  customElement ? (
                    <IconButton onClick={onClick} type="button" sx={{ p: '10px' }}>
                      <Svg className="header-icon" id={element as string} />
                    </IconButton>
                  ) : (
                    <Button onClick={onClick}>{element}</Button>
                  )
                }
              </div>
            ))}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
