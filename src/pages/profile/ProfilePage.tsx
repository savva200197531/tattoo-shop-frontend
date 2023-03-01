import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Stack, Tab, Tabs, useMediaQuery } from '@mui/material'

import { useAuth } from '../../contexts/auth/AuthContext'
import { TabProps } from '../../components/TabPanel/TabPanel'
import './desktop.scss'
import './mobile.scss'
import { StyledButton } from '../../components/StyledButtons'

const tabs: TabProps[] = [
  {
    label: 'Личная информация',
    to: '/profile/info',
  },
  {
    label: 'Заказы',
    to: '/profile/orders',
  },
  {
    label: 'Избранное',
    to: '/profile/favorite',
  },
]

const ProfilePage: React.FC = () => {
  const mobile = useMediaQuery('(max-width:750px)')
  const { logout, user, isUserExist } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="profile">
      <div className="container">
        {/*className={classNames('profile-content', mobile ? 'profile-content-mobile' : 'profile-content-desktop')}*/}
        <Stack direction={mobile ? 'column' : 'row'} spacing={2}>
          <div className="profile-tabs">
            <Tabs
              value={
                location.pathname !== '/' ?
                  location.pathname :
                  false
              }
              className="profile"
              orientation={mobile ? 'horizontal' : 'vertical'}
              variant="scrollable"
              // sx={{ borderRight: 1, borderColor: 'divider' }}
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

            {isUserExist && <StyledButton fullWidth variant="contained" onClick={logout}>Выйти</StyledButton>}
          </div>

          <div className="tab-outlet">
            <Outlet/>
          </div>
        </Stack>
      </div>
    </div>
  )
}

export default ProfilePage
