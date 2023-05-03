import React from 'react'
import { Typography } from '@mui/material'
import rockSvg from '../../assets/images/rock.svg'
import truckSvg from '../../assets/images/truck.svg'
import supportSvg from '../../assets/images/support.svg'

const list = [
  {
    text: '100% оригинальные товары от известных брендов',
    src: rockSvg,
  },
  {
    text: 'Быстрая доставка по всей России',
    src: truckSvg,
  },
  {
    text: 'Ежедневная поддержка клиентов',
    src: supportSvg,
  },
]

const MainPageHeader = () => {
  return (
    <div className="main-page__header">
      <Typography variant="h4" component="h1" fontWeight={500}>
        Tattoona-matata -магазин расходных
        материалов и тату оборудования
      </Typography>

      <div className="main-page__list">
        {list.map((item, index) => (
          <div className="main-page__list-item" key={index}>
            <p>{item.text}</p>
            <img src={item.src} alt=""/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainPageHeader
