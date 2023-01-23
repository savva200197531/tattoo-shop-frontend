import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import { setTokenToHeaders } from '../helpers/setTokenToHeaders'
import { local } from '../App'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logout = () => {
    local.removeItem('alisa-kisa-token')
    local.removeItem('alisa-kisa-user-id')
    setTokenToHeaders(undefined)
    navigate('/login')
  }

  return (
    <Button onClick={logout}>log out</Button>
  )
}

export default LogoutButton
