import React from 'react'
import { useParams } from 'react-router-dom'

import { Button, Typography } from '@mui/material'

import { useAuth } from '../../../contexts/auth/AuthContext'

const ConfirmationPage: React.FC = () => {
  const { token } = useParams()
  const { sendConfirmationLink, resendConfirmationLink } = useAuth()

  return (
    <div className="confirmation">
      <div className="container">
        <div className="confirmation-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Подтверждение почты
          </Typography>

          <Button onClick={() => sendConfirmationLink(token as string)}>Подтвердить</Button>
          <Button onClick={resendConfirmationLink}>Выслать ссылку заново</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage
