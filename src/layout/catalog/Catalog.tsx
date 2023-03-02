import React from 'react'
import { IconButton } from '@mui/material'
import './styles.scss'
import Hamburger from '../../components/Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'

const CatalogIcon: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onClick = () => {
    if (location.pathname === '/catalog') {
      navigate(-1)
    } else {
      navigate('/catalog')
    }
  }

  return (
    <IconButton
      color="secondary"
      onClick={onClick}
      className="catalog-button"
    >
      <Hamburger isActive={location.pathname === '/catalog'}/>
      <p className="catalog-text">Каталог</p>
    </IconButton>
  )
}

export default CatalogIcon
