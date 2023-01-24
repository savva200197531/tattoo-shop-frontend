import React from 'react'
import { Outlet } from 'react-router-dom'
import './styles.scss'

// type Props = {}

const AuthPage: React.FC = () => {
  return (
    <div className="auth">
      <div className="container">
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
