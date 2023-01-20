import React from 'react'
import { Outlet } from 'react-router-dom'

// type Props = {}

const AuthPage: React.FC = () => {
  return (
    <div>
      Auth page
      <Outlet />
    </div>
  )
}

export default AuthPage
