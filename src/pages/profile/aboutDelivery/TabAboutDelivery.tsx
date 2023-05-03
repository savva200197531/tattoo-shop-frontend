import React from 'react'

import { Typography } from '@mui/material'

import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import './styles.scss'
import DefaultYMap from '../../../components/DefaultYMap'

const TabAboutDelivery: React.FC = () => {
  return (
    <div className="about-delivery">
      <div className="container">
        <div className="about-delivery-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Доставка заказов
          </Typography>

          <ListWithTitle
            options={[
              {
                title: 'Самовывоз бесплатно',
                text: 'Алтайский край, г. Барнаул, ул. Гоголя 38',
              },
              {
                title: 'Доставка по г. Барнаул',
                text: 'Бесплатно',
              },
              {
                title: 'Доставка в другие регионы',
                text: 'Обсуждется индивидуально',
              },
            ]}
          />

          <DefaultYMap />
        </div>
      </div>
    </div>
  )
}

export default TabAboutDelivery
