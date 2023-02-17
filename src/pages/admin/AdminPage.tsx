import React from 'react'

import './styles.scss'
import { Tab, Tabs } from '@mui/material'
import { TabProps } from '../../components/TabPanel/TabPanel'
import { Link, Outlet, useLocation } from 'react-router-dom'

const tabs: TabProps[] = [
  {
    label: 'Товары',
    to: '/admin/products',
  },
  {
    label: 'Слайдер',
    to: '/admin/slider',
  },
]

const AdminPage: React.FC = () => {
  const location = useLocation()

  return (
    <div className="admin">
      <div className="container">
        <div className="admin-content">
          <Tabs
            value={
              location.pathname !== '/' ?
                location.pathname :
                false
            }
            orientation="vertical"
            variant="scrollable"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            className="admin-tabs"
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
        </div>
      </div>
    </div>
  )
}

export default AdminPage
