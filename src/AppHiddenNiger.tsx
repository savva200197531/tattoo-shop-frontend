import React, { useEffect, useState } from 'react'
import jwt from 'jwt-decode'

import nigerImg from './assets/images/niger.jpg'
import { local } from './App'
import { tokenKey } from './envs/development'
import { User } from './contexts/auth/types'

const time = 300000 // 5 min

const AppHiddenNiger: React.FC = () => {
  const [showNiger, setShowNiger] = useState<boolean>(false)

  const startNiger = () => {
    setInterval(() => {
      setShowNiger(true)
      setTimeout(() => {
        setShowNiger(false)
      }, 100)
    }, time)
  }

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)

    const token = local.getItem(tokenKey)

    if (!token) {
      return
    }

    const { role } = jwt(token) as User

    if (new Date() >= date && role === 'Admin') {
      startNiger()
    }
  }, [])

  return (
    <>
      {showNiger && (
        <img className="hidden-niger" src={nigerImg} alt=""/>
      )}
    </>
  )
}

export default AppHiddenNiger
