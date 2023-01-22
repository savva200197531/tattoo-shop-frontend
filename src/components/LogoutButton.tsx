import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import { setAuthToken } from '../helpers/setAuthToken'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('alisa-kisa-token')
    localStorage.removeItem('alisa-kisa-user-id')
    setAuthToken(undefined)
    navigate('login')
  }

  return (
    <Button onClick={logout}>log out</Button>
  )
}

export default LogoutButton
