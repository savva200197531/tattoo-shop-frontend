import React, { ReactNode, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'

import { AuthContextProps, GetUser, Login, Register, SendConfirmationLink, User } from './types'
import { setTokenToHeaders } from '../../helpers/setTokenToHeaders'
import { requestUrl, tokenKey } from '../../env'
import { local } from '../../App'
import { formatError } from '../../helpers/formatters/formatError'
import { useAlert } from '../alert/AlertContext'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

type Props = {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)
  const [isUserExist, setIsUserExist] = useState<boolean>(false)

  const navigate = useNavigate()
  const { showAlert } = useAlert()

  const register: Register = (payload) => axios.post<User>(`${requestUrl}/auth/register`, payload)
    .then(() => {
      navigate('/login')
    })
    .catch(error => {
      console.log(error)
      const message = formatError(error)

      showAlert({ text: message, severity: 'error' })
    })

  const login: Login = (payload) => axios.post<string>(`${requestUrl}/auth/login`, payload)
    .then(({ data }) => {
      local.setItem(tokenKey, data)
      setTokenToHeaders(data)
      const { id } = jwt(data) as User
      getUser(id)
        .then(() => {
          setIsUserExist(true)
        })
      navigate('/')
    })
    .catch(error => {
      const message = formatError(error)

      showAlert({ text: message, severity: 'error' })
    })

  const logout = () => {
    local.removeItem(tokenKey)
    setTokenToHeaders(undefined)
    setIsUserExist(false)
    setUser({} as User)
    navigate('/login')
  }

  const sendConfirmationLink: SendConfirmationLink = (token: string) => {
    return axios.post(`${requestUrl}/email-confirmation/confirm`, {
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

  const getUser: GetUser = (id: number) => {
    return axios.get<User>(`${requestUrl}/user/${id}`)
      .then(({ data }) => {
        setUser(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    const token = local.getItem(tokenKey)

    if (!token) return

    setTokenToHeaders(token)

    const { id } = jwt(token) as User

    getUser(id)
      .then(() => {
        setIsUserExist(true)
      })
  }, [])


  const value = {
    register,
    login,
    sendConfirmationLink,
    resendConfirmationLink,
    setUser,
    user,
    logout,
    getUser,
    isUserExist,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
