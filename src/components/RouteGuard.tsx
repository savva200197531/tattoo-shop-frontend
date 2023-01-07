import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactElement
}

const RouteGuard: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('alisa-kisa-token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RouteGuard
