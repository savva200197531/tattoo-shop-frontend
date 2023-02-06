import React from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { StyledButton } from '../../components/StyledButtons'

const ProfilePage: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-content">
          <StyledButton variant="contained" onClick={logout}>Выйти</StyledButton>
          <StyledButton variant="contained" onClick={() => navigate('/admin')}>Админка</StyledButton>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
