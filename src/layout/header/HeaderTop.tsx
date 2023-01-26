import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import { Button } from '@mui/material'

import { ListItem } from '../../types/list-item'
import SearchField from '../../components/SearchField/SearchField'
import Svg from '../../components/Svg'
import CartIcon from '../../components/CartIcon'

const HeaderTop = () => {
  const navigate = useNavigate()

  const items: ListItem[] = [
    {
      element: <Button variant="outlined" onClick={() => navigate('/')}>Logo</Button>,
      customElement: true,
    },
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
      onClick: () => navigate('favorite'),
    },
    {
      element: <CartIcon />,
      customElement: true,
      onClick: () => navigate('cart'),
    },
  ]

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-items">
          {items.map(({ element, customElement, onClick, style }, index) => (

            <div className="header-item" style={style} key={index}>
              {customElement ? element : (
                <IconButton onClick={onClick} type="button" sx={{ p: '6px' }}>
                  <Svg className="header-icon" id={element as string} />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeaderTop
