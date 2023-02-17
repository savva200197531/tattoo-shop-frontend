import React from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { StyledButton } from '../../components/StyledButtons'
import { TabProps } from '../../components/TabPanel/TabPanel'
import { Tab, Tabs } from '@mui/material'
import './styles.scss'

const tabs: TabProps[] = [
  {
    label: 'Личная информация',
    to: '/profile/info',
  },
  {
    label: 'Заказы',
    to: '/profile/orders',
  },
]

const ProfilePage: React.FC = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-content">
          <div className="profile-tabs">
            <Tabs
              value={
                location.pathname !== '/' ?
                  location.pathname :
                  false
              }
              orientation="vertical"
              variant="scrollable"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {tabs.map(({ label, to }, index) => (
                <Tab
                  key={index}
                  value={to}
                  label={label}
                  component={Link}
                  to={to}
                />
              ))}
            </Tabs>

            {user.role === 'Admin' && <StyledButton fullWidth variant="contained" onClick={() => navigate('/admin/products')}>Админка</StyledButton>}

            <StyledButton fullWidth variant="contained" onClick={logout}>Выйти</StyledButton>
          </div>

          <div className="tab-outlet">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
