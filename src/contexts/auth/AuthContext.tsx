import React, { ReactNode, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { AuthContextProps, Login, Register, User } from './types'
import { setTokenToHeaders } from '../../helpers/setTokenToHeaders'
import requestUrl from '../../requestUrl'
import { local } from '../../App'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

type Props = {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)

  const navigate = useNavigate()

  const register: Register = (payload) => axios.post<User>(`${requestUrl}/auth/register`, payload)
      .then(({ data }) => {
        local.setItem('alisa-kisa-user-id', JSON.stringify(data.id))
        navigate('/confirmation/await')
      })
      .catch(err => console.log(err))

  const login: Login = (payload) => axios.post<string>(`${requestUrl}/auth/login`, payload)
      .then(({ data }) => {
        refreshToken(data)
        navigate('/')
      })
      .catch(err => console.log(err))

  const sendConfirmationLink = (token: string) => {
    axios.post(`${requestUrl}/email-confirmation/confirm`, {
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

    axios.post(`${requestUrl}/resend-confirmation-link/${userId}`)
        .catch(err => console.log(err))
  }

  const refreshToken = (token: string) => {
    local.setItem('alisa-kisa-token', token)

    setTokenToHeaders(token)
  }

  const refresh = () => {
    if (!localStorage.getItem('alisa-kisa-token')) {
      return
    }

    return axios.post(`${requestUrl}/auth/refresh`)
        .then(({ data }) => {
          refreshToken(data)
        })
        .catch(error => {
          console.log(error)
        })
  }

  const getUser = () => {
    if (!localStorage.getItem('alisa-kisa-token')) {
      return
    }

    axios.get(`${requestUrl}/auth/get-user-by-jwt`)
        .then(({ data }) => {
          localStorage.setItem('alisa-kisa-user-id', JSON.stringify(data.id))
          setUser(data)
        })
        .catch(err => console.log(err))
  }

  const value = {
    register,
    login,
    sendConfirmationLink,
    resendConfirmationLink,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
