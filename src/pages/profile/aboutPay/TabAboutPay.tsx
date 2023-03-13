import React from 'react'
import { Typography } from '@mui/material'

const TabAboutPay: React.FC = () => {
  return (
    <div className="about-pay">
      <div className="container">
        <div className="about-pay-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Оплата заказов
          </Typography>

          <Typography component="p" fontWeight={500} textAlign="center">
            После оформления заказа с вами свяжется менеджер и предоставит варианты оплаты (при получении, предоплата).
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default TabAboutPay
