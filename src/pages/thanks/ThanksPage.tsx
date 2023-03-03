import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@mui/material'

import { StyledButton } from '../../components/StyledButtons'
import './styles.scss'

const ThanksPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="thanks">
      <div className="container">
        <div className="thanks-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Спасибо за заказ!
          </Typography>

          <Typography variant="h5" component="h2" fontWeight={500} textAlign="center">
            Скоро с вами свяжется наш менеджер.
          </Typography>

          <div className="thanks-button">
            <StyledButton onClick={() => navigate('/profile/orders')}>Заказы</StyledButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThanksPage
