import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'

import { ListItem } from '../../types/list-item'
import SearchField from '../../components/SearchField/SearchField'
import Svg from '../../components/Svg'
import CounterBadge from '../../components/CounterBadge'
import { useAuth } from '../../contexts/auth/AuthContext'
import Logo from '../../components/Logo'

const HeaderTop = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const items: ListItem[] = [
    {
      element: <Logo />,
      customElement: true,
    },
    {
      element: 'phone',
    },
    {
      element: 'vk',
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
      element: (
        <CounterBadge count={user.favorite?.length} onClick={() => navigate('/favorite')}>
          <Svg fill="none" stroke="black" className="header-icon" id="hearth" />
        </CounterBadge>
      ),
      customElement: true,
    },
    {
      element: (
        <CounterBadge count={user.cart?.length} onClick={() => navigate('/cart')}>
          <Svg className="header-icon" id="cart" />
        </CounterBadge>
      ),
      customElement: true,
    },
  ]

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-items">
          {items.map(({ element, customElement, onClick, style }, index) => (

            <div className="header-item" style={style} key={index}>
              {customElement ? element : (
                <IconButton onClick={onClick} type="button" color="secondary" sx={{ p: '6px' }}>
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
