import React from 'react'
import { StyledButton } from './StyledButtons'
import { useNavigate } from 'react-router-dom'

const AuthButton = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center' }}>
      <StyledButton onClick={() => navigate('/register')}>Сначала зарегистрируйтесь</StyledButton>
    </div>
  )
}

export default AuthButton
