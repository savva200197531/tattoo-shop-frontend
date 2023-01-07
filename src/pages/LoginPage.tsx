import React from 'react'
import axios from 'axios'
import { setAuthToken } from '../App'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = (email?: string, pass?: string) => {
    const loginPayload = {
      email: 'elon@gmail.com',
      password: '123456789',
    }

    axios.post('http://localhost:3001/auth/login', loginPayload)
      .then(response => {
        const token = response.data

        localStorage.setItem('alisa-kisa-token', token)

        setAuthToken(token)

        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      login
      <Button color="primary" variant="contained" onClick={() => handleSubmit()}>123</Button>
    </div>
  )
}

export default LoginPage
