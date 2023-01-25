import React from 'react'

import './styles.scss'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

const Header = () => {
  return (
    <header className="header">
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header
