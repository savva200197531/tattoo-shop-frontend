import React from 'react'

import { Toolbar } from '@mui/material'

import SearchField from '../../../components/SearchField/SearchField'
import './mobile.scss'

const HeaderMobile: React.FC = () => {
  // const items: ListItem[] = [
  //   {
  //     element: <Logo />,
  //     customElement: true,
  //   },
  //   {
  //     element: (
  //       <CounterBadge count={user.cart?.length} onClick={() => navigate('/cart')}>
  //         <Svg className="base-icon" id="cart" />
  //       </CounterBadge>
  //     ),
  //     customElement: true,
  //   },
  //   {
  //     element: 'profile',
  //     onClick: () => navigate('/profile/info'),
  //   },
  // ]

  return (
    <Toolbar style={{ padding: 'unset' }}>
      <SearchField />
    </Toolbar>
  )
}

export default HeaderMobile
