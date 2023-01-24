import React from 'react'

import './styles.scss'
import HeaderTop from './top/HeaderTop'
import HeaderBottom from './bottom/HeaderBottom'

const Header = () => {
  return (
    <header className="header">
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header
