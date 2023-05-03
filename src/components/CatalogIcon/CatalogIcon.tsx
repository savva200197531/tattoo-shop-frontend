import React from 'react'
import { Button } from '@mui/material'
import './styles.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Hamburger from '../Hamburger/Hamburger'

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
    <Button
      color="secondary"
      onClick={onClick}
      className="catalog-button"
    >
      <Hamburger isActive={location.pathname === '/catalog'}/>
      <p className="catalog-text">Каталог</p>
    </Button>
  )
}

export default CatalogIcon
