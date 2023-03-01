import React from 'react'
import { Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'

import './desktop.scss'
import Svg from '../../../components/Svg'
import Logo from '../../../components/Logo'
import { ListItem } from '../../../types/list-item'
import classNames from 'classnames'

const FooterDesktop: React.FC = () => {
  const items: ListItem[] = [
    {
      element: 'vk',
    },
    {
      element: 'phone',
    },
    {
      element: 'instagram',
    },
    {
      element: 'telegram',
    },
  ]

  return (
    <footer className={classNames('footer', 'footer-desktop')}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <Logo />
          </div>
          <div className="footer-column">
            <Link to="/about">О компании</Link>
            {/*<Link to="/about">Скидки</Link>*/}
            {/*<Link to="/about">Отзывы</Link>*/}
          </div>
          <div className="footer-column">
            <Link to="/about-pay">Оплата заказов</Link>
            <Link to="/about-delivery">Доставка заказов</Link>
            <Link to="/contacts">Контакты</Link>
          </div>
          <div className="footer-column">
            <a href="tel:89635207570">+7 963 520 7570</a>

            <div className="footer-column__socials">
              {items.map(({ element, onClick }, index) => (
                <IconButton key={index} onClick={onClick} type="button" color="secondary" sx={{ p: '6px' }}>
                  <Svg className="base-icon" id={element as string} />
                </IconButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterDesktop
