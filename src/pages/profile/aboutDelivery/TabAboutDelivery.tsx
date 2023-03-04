import React from 'react'

import { Typography } from '@mui/material'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import './styles.scss'

const coordinates = [53.335328, 83.794823]

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

          <YMaps>
            <Map className="map" width="100%" height="100%" defaultState={{ center: coordinates, zoom: 15 }}>
              <Placemark defaultGeometry={coordinates}/>
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  )
}

export default TabAboutDelivery
