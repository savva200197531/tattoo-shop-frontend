import React from 'react'

import { Typography } from '@mui/material'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import './styles.scss'

const coordinates = [53.335328, 83.794823]

const TabAbout: React.FC = () => {
  return (
    <div className="about">
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
        О нас
      </Typography>

      <ListWithTitle
        options={[
          {
            title: 'Адрес',
            text: 'Алтайский край, г. Барнаул, ул. Гоголя 38',
          },
          {
            title: 'Телефон',
            text: <a href="tel:89635207570">+7 963 520 7570</a>,
          },
        ]}
      />

      <YMaps>
        <Map className="about-map" width="100%" height="100%" defaultState={{ center: coordinates, zoom: 15 }}>
          <Placemark defaultGeometry={coordinates} />
        </Map>
      </YMaps>
    </div>
  )
}

export default TabAbout
