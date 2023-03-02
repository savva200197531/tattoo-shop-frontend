import React from 'react'

import { AppBar, useMediaQuery } from '@mui/material'
import classNames from 'classnames'
import HeaderMobile from './mobile/HeaderMobile'
import HeaderDesktop from './desktop/HeaderDesktop'
import './styles.scss'

const Header = () => {
  const mobile = useMediaQuery('(max-width:750px)')

  return (
    <AppBar style={{ background: 'white' }} className={classNames('header', mobile ? 'header-mobile' : 'header-desktop')}>
      <div className="container">
        {mobile ? <HeaderMobile /> : <HeaderDesktop />}
      </div>
    </AppBar>
  )
}

export default Header
