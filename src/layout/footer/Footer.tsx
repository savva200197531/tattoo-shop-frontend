import React from 'react'

import { useMediaQuery } from '@mui/material'

import FooterMobile from './mobile/FooterMobile'
import FooterDesktop from './desktop/FooterDesktop'
import './styles.scss'

const Footer: React.FC = () => {
  const mobile = useMediaQuery('(max-width:750px)')

  return mobile ? <FooterMobile /> : <FooterDesktop />
}

export default Footer
