import React from 'react'
import './styles.scss'
import { Typography } from '@mui/material'

const DeliveryPage: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Доставка и оплата
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default DeliveryPage
