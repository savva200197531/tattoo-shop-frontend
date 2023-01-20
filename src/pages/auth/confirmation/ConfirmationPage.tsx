import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { useAuth } from '../../../contexts/auth/AuthContext'

const ConfirmationPage = () => {
  const { token } = useParams()
  const { sendConfirmationLink, resendConfirmationLink } = useAuth()

  useEffect(() => {
    if (!!token && token !== 'await') {
      sendConfirmationLink(token)
    }
  }, [sendConfirmationLink, token])

  return (
    <div>
      {token === 'await' && (
        <div>
          <div>Пожалуйста подтвердите почту</div>
          <Button onClick={resendConfirmationLink}>Выслать ссылку заново</Button>
          <Link to="/login">Продолжить без подтверждения</Link>
        </div>
      )}
    </div>
  )
}

export default ConfirmationPage
