import React, { ReactElement, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { AuthContextProps, Login, Register, User } from './types'
import { setAuthToken } from '../../helpers/setAuthToken'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

type Props = {
  children: ReactElement
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)

  const navigate = useNavigate()

  const register: Register = (payload) => axios.post<User>('http://localhost:3001/auth/register', payload)
    .then(({ data }) => {
      navigate('/confirmation/await')
      localStorage.setItem('alisa-kisa-user-id', JSON.stringify(data.id))
    })
    .catch(err => console.log(err))

  const login: Login = (payload) => axios.post<string>('http://localhost:3001/auth/login', payload)
    .then(response => {
      refreshToken(response.data)
      getUser()
      navigate('/')
    })
    .catch(err => console.log(err))

  const sendConfirmationLink = (token: string) => {
    axios.post('http://localhost:3001/email-confirmation/confirm', {
      token,
    })
      .then(() => {
        navigate('/login')
      })
      .catch(err => console.log(err))
  }

  const resendConfirmationLink = () => {
    const userId = localStorage.getItem('alisa-kisa-user-id')

    if (!userId) {
      return
    }

    axios.post(`http://localhost:3001/email-confirmation/resend-confirmation-link/${userId}`)
      .catch(err => console.log(err))
  }

  const refreshToken = (token: string) => {
    localStorage.setItem('alisa-kisa-token', token)

    setAuthToken(token)
  }

  const refresh = () => {
    if (!localStorage.getItem('alisa-kisa-token')) {
      return
    }

    return axios.post('http://localhost:3001/auth/refresh')
      .then((response) => {
        refreshToken(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getUser = () => {
    if (!localStorage.getItem('alisa-kisa-token')) {
      return
    }

    axios.get('http://localhost:3001/auth/get-user-by-jwt')
      .then(response => {
        setUser(response.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    refresh()?.then(() => {
      getUser()
    })
  }, [])

  const value = {
    register,
    login,
    sendConfirmationLink,
    resendConfirmationLink,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
