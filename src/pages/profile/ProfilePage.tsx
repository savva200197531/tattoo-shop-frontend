import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Stack, Tab, Tabs, useMediaQuery } from '@mui/material'

import { TabProps } from '../../components/TabPanel/TabPanel'
import './desktop.scss'
import './mobile.scss'

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
  const location = useLocation()

  return (
    <div className="profile">
      <div className="container">
        {/*className={classNames('profile-content', mobile ? 'profile-content-mobile' : 'profile-content-desktop')}*/}
        <Stack direction={mobile ? 'column' : 'row'} spacing={2}>
          <Tabs
            value={
              location.pathname !== '/' ?
                location.pathname :
                false
            }
            className="profile-tabs tabs"
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

          <div className="tab-outlet">
            <Outlet/>
          </div>
        </Stack>
      </div>
    </div>
  )
}

export default ProfilePage
