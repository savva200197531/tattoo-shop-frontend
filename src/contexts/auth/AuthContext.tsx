import React, { ReactNode, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'

import { AuthContextProps, FullUser, Login, Register, User } from './types'
import { setTokenToHeaders } from '../../helpers/setTokenToHeaders'
import { requestUrl, tokenKey } from '../../env'
import { local } from '../../App'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

type Props = {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)

  const navigate = useNavigate()

  const register: Register = (payload) => axios.post<FullUser>(`${requestUrl}/auth/register`, payload)
      .then(() => {
        navigate('/login')
      })
      .catch(err => console.log(err))

  const login: Login = (payload) => axios.post<string>(`${requestUrl}/auth/login`, payload)
      .then(({ data }) => {
        local.setItem(tokenKey, data)
        setTokenToHeaders(data)
        setUser(jwt(data))
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

  const resendConfirmationLink = () =>
    axios.post(`${requestUrl}/email-confirmation/resend-confirmation-link`).catch(err => console.log(err))

  const refresh = () => {
    return axios.post(`${requestUrl}/auth/refresh`)
        .catch(error => {
          console.log(error)
        })
  }

  const getUser = (id: number) => axios.get(`${requestUrl}/user/${id}`).catch(err => console.log(err))

  useEffect(() => {
    const token = local.getItem(tokenKey)

    if (!token) return

    setTokenToHeaders(token)

    const { id, email } = jwt(token) as User

    setUser({
      id,
      email,
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
