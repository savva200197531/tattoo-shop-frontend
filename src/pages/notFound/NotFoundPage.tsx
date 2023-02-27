import React from 'react'
import { Typography } from '@mui/material'
import { StyledButton } from '../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <Typography variant="h3" component="h1" fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Такой страницы не существует
          </Typography>

          <StyledButton onClick={() => navigate(-1)}>Назад</StyledButton>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
