import React from 'react'
import './styles.scss'

const TestBanner: React.FC = () => {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <div className="ticker__item">Сайт работает в тестовом режиме, при возникновении ошибки свяжитесь с администратором.</div>
      </div>
    </div>
  )
}

export default TestBanner
