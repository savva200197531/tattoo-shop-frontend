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
            Произодится на сайте, с помощью сервиса
            <a rel="noreferrer" href="https://yookassa.ru/" target="_blank"> ЮКасса</a>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default TabAboutPay
