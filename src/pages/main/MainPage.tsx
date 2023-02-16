import React from 'react'
import './styles.scss'
import { Typography } from '@mui/material'
import MainSlider from './MainSlider'
import MainProducts from './MainProducts'

const MainPage: React.FC = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="main-content">
          <MainSlider />

          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mt: '80px', mb: '60px' }}>
            Новинки
          </Typography>

          <MainProducts />
        </div>
      </div>
    </div>
  )
}

export default MainPage
