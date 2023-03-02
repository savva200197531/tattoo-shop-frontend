import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import { Box, Toolbar } from '@mui/material'

import { ListItem } from '../../../types/list-item'
import SearchField from '../../../components/SearchField/SearchField'
import Svg from '../../../components/Svg/Svg'
import CounterBadge from '../../../components/CounterBadge'
import { useAuth } from '../../../contexts/auth/AuthContext'
import Logo from '../../../components/Logo'
import './desktop.scss'
import ProfileIcon from '../../../components/ProfileIcon/ProfileIcon'
import CatalogIcon from '../../catalog/Catalog'

const HeaderDesktop: React.FC = () => {
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
      grow: 4,
    },
    {
      element: <CatalogIcon />,
      customElement: true,
    },
    {
      element: <ProfileIcon />,
      customElement: true,
    },
    {
      element: (
        <CounterBadge right={10} count={user.favorite?.length} onClick={() => navigate('/profile/favorite')}>
          <Svg text="Избранное" fill="none" stroke="black" className="base-icon" id="hearth" />
        </CounterBadge>
      ),
      customElement: true,
    },
    {
      element: (
        <CounterBadge right={4} count={user.cart?.length} onClick={() => navigate('/cart')}>
          <Svg text="Корзина" className="base-icon" id="cart" />
        </CounterBadge>
      ),
      customElement: true,
    },
  ]

  return (
    <Toolbar style={{ padding: 'unset' }}>
      {items.map(({ element, customElement, onClick, grow }, index) => (
        <Box className="header-item" key={index} sx={{ flexGrow: grow || 0 }}>
          {customElement ? element : (
            <IconButton onClick={onClick} type="button" color="secondary" sx={{ p: '6px' }}>
              <Svg className="base-icon" id={element as string} />
            </IconButton>
          )}
        </Box>
      ))}
    </Toolbar>
  )
}

export default HeaderDesktop
