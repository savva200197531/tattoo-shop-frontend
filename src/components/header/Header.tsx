import React from 'react'
import LogoutButton from '../LogoutButton'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Button variant="contained" onClick={() => navigate('/')}>products</Button>
      <Button variant="contained" onClick={() => navigate('/cart')}>cart</Button>
      <LogoutButton />
    </div>
  )
}

export default Header
