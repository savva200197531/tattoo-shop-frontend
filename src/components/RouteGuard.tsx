import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { tokenKey } from '../env'
import { local } from '../App'

type Props = {
  children: ReactNode
}

const RouteGuard: React.FC<Props> = ({ children }) => {
  const token = local.getItem(tokenKey)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default RouteGuard
