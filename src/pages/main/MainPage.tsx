import React from 'react'

import { Typography, useMediaQuery } from '@mui/material'

import './styles.scss'
import MainSlider from './MainSlider'
import MainProducts from './MainProducts'
import CategoriesList from '../../components/CategoriesList/CategoriesList'
import MainPageDelivery from './MainPageDelivery'
// import MainPageAbout from './MainPageAbout'
import DefaultYMap from '../../components/DefaultYMap'
import FeedbackForm from './FeedbackForm'
import MainPageHeader from './MainPageHeader'

const MainPage: React.FC = () => {
  const mobile = useMediaQuery('(max-width:750px)')

  return (
    <div className="main">
      <div className="container">
        <div className="main-content">
          <section>
            <MainPageHeader />
          </section>

          <section>
            <MainSlider/>
          </section>

          <section>
            <Typography variant="h4" component="h1" fontWeight={500}>
              Каталог
            </Typography>

            <CategoriesList mobile={mobile}/>
          </section>

          <section>
            <Typography variant="h4" component="h1" fontWeight={500}>
              Новинки
            </Typography>

            <MainProducts/>
          </section>

          {/*<section>*/}
          {/*  <Typography variant="h4" component="h1" fontWeight={500}>*/}
          {/*    О компании*/}
          {/*  </Typography>*/}

          {/*  <MainPageAbout />*/}
          {/*</section>*/}

          <section>
            <Typography variant="h4" component="h1" fontWeight={500}>
              Доставка и оплата
            </Typography>

            <MainPageDelivery />
          </section>

          <section className="main-content__feedback-section">
            <div>
              <Typography variant="h4" component="h1" fontWeight={500}>
                Остались вопросы?
              </Typography>

              <Typography variant="h6" component="h3" fontWeight={400}>
                Оставьте свой номер телефона и мы свяжемся с вами.
              </Typography>
            </div>

            <FeedbackForm />
          </section>

          <section>
            <Typography variant="h4" component="h1" fontWeight={500}>
              Контакты
            </Typography>

            <Typography variant="h6" component="h3" fontWeight={400}>
              Алтайский край, г. Барнаул, ул. Гоголя 38
            </Typography>

            <DefaultYMap />
          </section>
        </div>
      </div>
    </div>
  )
}

export default MainPage
