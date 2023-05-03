import React from 'react'
import truckSvg from '../../assets/images/truck.svg'
import deliverySvg from '../../assets/images/delivery.svg'
import paySvg from '../../assets/images/pay.svg'

const list = [
  {
    text: 'Самовывоз по адресу Алтайский край, г. Барнаул, ул. Гоголя 38',
    src: truckSvg,
  },
  {
    text: 'Бесплатная доставка по г. Барнаул Доставка СДЭК по всей России (рассчитывается индивидуально)',
    src: deliverySvg,
  },
  {
    boldText: 'У нас возможна оплата переводом или наличными.',
    text: 'После оформления заказа вам позвонит/напишет менеджер и предоставит все варианты оплаты',
    src: paySvg,
  },
]

const MainPageDelivery: React.FC = () => {
  return (
    <div className="main-page__list">
      {list.map((item, index) => (
        <div key={index} className="main-page__list-item">
          <div>
            <b>
              {item.boldText}
            </b>
            <p>
              {item.text}
            </p>
          </div>

          <img src={item.src} alt=""/>
        </div>
      ))}
    </div>
  )
}

export default MainPageDelivery
