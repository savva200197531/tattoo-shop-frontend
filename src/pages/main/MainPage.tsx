import React from 'react'

import { Typography, useMediaQuery } from '@mui/material'

import './styles.scss'
import MainSlider from './MainSlider'
import MainProducts from './MainProducts'
import CategoriesList from '../../components/CategoriesList/CategoriesList'

const MainPage: React.FC = () => {
  const mobile = useMediaQuery('(max-width:750px)')

  return (
    <div className="main">
      <div className="container">
        <div className="main-content">
          <MainSlider />

          <CategoriesList mobile={mobile} />

          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center">
            Новинки
          </Typography>

          <MainProducts />
        </div>
      </div>
    </div>
  )
}

export default MainPage
