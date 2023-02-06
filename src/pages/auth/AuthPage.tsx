import React from 'react'
import { Outlet } from 'react-router-dom'
import './styles.scss'
import { Box, Typography } from '@mui/material'

// type Props = {}

const AuthPage: React.FC = () => {
  return (
    <div className="auth">
      <div className="container">
        <div className="auth-content">
          <Box sx={{ maxWidth: '30rem' }} className="auth-wrapper">
            <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
              Вход
            </Typography>
            <Outlet />
          </Box>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
