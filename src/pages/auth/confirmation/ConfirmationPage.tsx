import React from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { useAuth } from '../../../contexts/auth/AuthContext'

const ConfirmationPage = () => {
  const { token } = useParams()
  const { sendConfirmationLink, resendConfirmationLink } = useAuth()

  return (
    <div>
      <Button onClick={() => sendConfirmationLink(token as string)}></Button>
      <Button onClick={resendConfirmationLink}>Выслать ссылку заново</Button>
    </div>
  )
}

export default ConfirmationPage
