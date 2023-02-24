import React from 'react'
import { Button } from '@mui/material'
import './styles.scss'
import Hamburger from '../../components/Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'

const Catalog: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="catalog">
      <Button
        color="secondary"
        onClick={() => navigate('/catalog')}
        startIcon={<Hamburger isActive={location.pathname === '/catalog'}/>}
      >
        Каталог
      </Button>
    </div>
  )
}

export default Catalog
