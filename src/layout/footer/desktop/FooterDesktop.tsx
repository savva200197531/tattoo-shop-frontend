import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './desktop.scss'
import Logo from '../../../components/Logo'
import ContactsList from '../../../components/ContactsList/ContactsList'

const FooterDesktop: React.FC = () => {
  return (
    <footer className={classNames('footer', 'footer-desktop')}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <Logo />
          </div>
          <div className="footer-column">
            <Link to="/profile/about">О компании</Link>
            <Link to="/profile/contacts">Контакты</Link>
            {/*<Link to="/about">Скидки</Link>*/}
            {/*<Link to="/about">Отзывы</Link>*/}
          </div>
          <div className="footer-column">
            <Link to="/profile/about-pay">Оплата</Link>
            <Link to="/profile/about-delivery">Доставка</Link>
          </div>
          <div className="footer-column">
            <a href="tel:89635207570">+7 963 520 7570</a>

            <div className="footer-column__socials">
              <ContactsList />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterDesktop
