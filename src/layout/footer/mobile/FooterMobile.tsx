import React from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import { AppBar, Box, Toolbar } from '@mui/material'

import { useAuth } from '../../../contexts/auth/AuthContext'
import { ListItem } from '../../../types/list-item'
import Logo from '../../../components/Logo'
import CounterBadge from '../../../components/CounterBadge'
import Svg from '../../../components/Svg'
import './mobile.scss'
import CatalogIcon from '../../catalog/Catalog'

const FooterMobile: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const items: ListItem[] = [
    // {
    //   element: 'profile',
    //   onClick: () => navigate('/profile/info'),
    // },
    {
      element: 'profile',
      onClick: () => navigate('/profile/info'),
    },
    {
      element: <CatalogIcon />,
      customElement: true,
    },
    {
      element: <Logo />,
      customElement: true,
    },
    {
      element: (
        <CounterBadge count={user.favorite?.length} onClick={() => navigate('/profile/favorite')}>
          <Svg fill="none" stroke="black" className="base-icon" id="hearth" />
        </CounterBadge>
      ),
      customElement: true,
    },
    {
      element: (
        <CounterBadge count={user.cart?.length} onClick={() => navigate('/cart')}>
          <Svg className="base-icon" id="cart" />
        </CounterBadge>
      ),
      customElement: true,
    },
  ]

  return (
    <AppBar
      className={classNames('footer', 'footer-mobile')}
      position="fixed"
      color="primary"
      sx={{ top: 'auto', bottom: 0 }}
      component="footer"
    >
      <div className="container">
        <Toolbar style={{ padding: 'unset' }} className="footer-mobile-content">
          {items.map(({ element, customElement, onClick, grow }, index) => (
            <Box className="footer-mobile-item" key={index} sx={{ flexGrow: grow || 0 }}>
              {customElement ? element : (
                <IconButton onClick={onClick} type="button" color="secondary" sx={{ p: '6px' }}>
                  <Svg className="base-icon" id={element as string} />
                </IconButton>
              )}
            </Box>
          ))}
        </Toolbar>
      </div>
    </AppBar>
  )
}

export default FooterMobile
