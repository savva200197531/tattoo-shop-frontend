import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { StyledButton } from '../../components/StyledButtons'
import './styles.scss'
import { useAuth } from '../../contexts/auth/AuthContext'

const ThanksPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isUserExist } = useAuth()

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

          <Typography variant="h5" component="h2" fontWeight={500} textAlign="center">
            Информация о заказе была выслана на почту.
          </Typography>

          {isUserExist && (
            <div className="thanks-button">
              <StyledButton onClick={() => navigate(`/orders/${id}`)}>Перейти к заказу</StyledButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ThanksPage
