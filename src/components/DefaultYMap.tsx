import React from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

const coordinates = [53.335328, 83.794823]

const DefaultYMap: React.FC = () => {
  return (
    <YMaps>
      <Map className="map" width="100%" height="100%" defaultState={{ center: coordinates, zoom: 15 }}>
        <Placemark defaultGeometry={coordinates}/>
      </Map>
    </YMaps>
  )
}

export default DefaultYMap
