import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-content">
          <Button variant="outlined" onClick={logout}>Выйти</Button>
          <Button variant="outlined" onClick={() => navigate('/admin')}>Админка</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
