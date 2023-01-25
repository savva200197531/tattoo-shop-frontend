import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from '../../contexts/auth/AuthContext'

const ProfilePage: React.FC = () => {
  const { logout } = useAuth()

  return (
    <div>
      <Button onClick={logout}>log out</Button>
    </div>
  )
}

export default ProfilePage
