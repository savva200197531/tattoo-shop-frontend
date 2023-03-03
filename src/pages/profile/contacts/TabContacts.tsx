import React from 'react'
import { Typography } from '@mui/material'
import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'

const TabContacts: React.FC = () => {
  return (
    <div className="contacts">
      <div className="container">
        <div className="contacts-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Контакты
          </Typography>

          <ListWithTitle
            options={[
              {
                title: 'Телефон',
                text: <a href="tel:89635207570">+7 963 520 7570</a>,
              },
              {
                title: 'Вконтакте',
                text: '',
              },
              {
                title: 'Инстаграм',
                text: (
                  <a rel="noreferrer" href="https://instagram.com/tattoonamatata.shop?igshid=YmMyMTA2M2Y=" target="_blank">
                    https://instagram.com/tattoonamatata.shop?igshid=YmMyMTA2M2Y=
                  </a>
                ),
              },
              {
                title: 'Телеграм',
                text: '',
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default TabContacts
