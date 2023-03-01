import React from 'react'
import { IconButton } from '@mui/material'
import './styles.scss'
import Hamburger from '../../components/Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'

const CatalogIcon: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <IconButton
      color="secondary"
      onClick={() => navigate('/catalog')}
    >
      <Hamburger isActive={location.pathname === '/catalog'}/>
    </IconButton>
  )
}

export default CatalogIcon
