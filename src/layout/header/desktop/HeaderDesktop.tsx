import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import { Box, Toolbar } from '@mui/material'

import { ListItem } from '../../../types/list-item'
import SearchField from '../../../components/SearchField/SearchField'
import Svg from '../../../components/Svg/Svg'
import CounterBadge from '../../../components/CounterBadge'
import Logo from '../../../components/Logo'
import ProfileIcon from '../../../components/ProfileIcon/ProfileIcon'
import CatalogIcon from '../../catalog/Catalog'
import ContactsList from '../../../components/ContactsList/ContactsList'
import './desktop.scss'
import { useCart } from '../../../contexts/cart/CartContext'
import { useFavorite } from '../../../contexts/favorite/FavoriteContext'

const HeaderDesktop: React.FC = () => {
  const navigate = useNavigate()
  const { cart } = useCart()
  const { favoriteProducts } = useFavorite()

  const items: ListItem[] = [
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
        <CounterBadge right={19} count={favoriteProducts.length} onClick={() => navigate('/profile/favorite')}>
          <Svg text="Избранное" fill="none" stroke="black" className="base-icon" id="hearth" />
        </CounterBadge>
      ),
      customElement: true,
    },
    {
      element: (
        <CounterBadge count={cart.items?.length} onClick={() => navigate('/cart')}>
          <Svg text="Корзина" className="base-icon" id="cart" />
        </CounterBadge>
      ),
      customElement: true,
    },
  ]

  return (
    <Toolbar style={{ padding: 'unset' }}>
      <Logo />

      <ContactsList />

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
