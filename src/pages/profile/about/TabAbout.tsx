import React from 'react'

import { Typography } from '@mui/material'
import './styles.scss'

const advantages: string[] = [
  '-Прямые поставки от производителей, обеспечивающие низкие цены на оригинальные товары;',
  '-Грамотная логистика;',
  '-Специальные ценовые условия, выдвигаемые нашими производителями;',
  '-В наличии всегда только оригинальные товары;',
  '-Быстрая доставка по всем городам России;',
  '-Индивидуальный подход к каждому покупателю, все посылки с отправляемой продукцией тщательно упаковываются, защищаются воздушно-пупырчатой плёнкой и запечатываются клейкой лентой;',
  '-Самый большой в Алтайском крае магазин розничной и оптовой торговли оборудованием и расходными материалами',
]

const TabAbout: React.FC = () => {
  return (
    <div className="about">
      <div className="about-row">
        <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
          О нас
        </Typography>

        <p className="about-row__text">
          Приветствуем вас в Tattoona-matata shop! Мы – первый крупнейший магазин расходных материалов и тату
          оборудования в Алтайском крае.
          В магазине существует гибкая система скидок для постоянных покупателей. Мы заинтересованы в каждом клиенте и
          рассмотрим любые варианты взаимовыгодного сотрудничества.
        </p>
      </div>

      <div className="about-row">
        <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
          Преимущества работы с нами
        </Typography>

        <ul className="about-advantages__list">
          {advantages.map((text, key) => <li key={key} className="about-advantages__item">{text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default TabAbout
