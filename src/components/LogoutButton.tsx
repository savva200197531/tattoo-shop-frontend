import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('alisa-kisa-token')
    navigate('login')
  }

  return (
    <Button onClick={logout}>log out</Button>
  )
}

export default LogoutButton
