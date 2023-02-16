import React, { useState } from 'react'

import './styles.scss'
import { Tab, Tabs } from '@mui/material'
import { TabProps } from '../../components/TabPanel/TabPanel'
import { Link, Outlet } from 'react-router-dom'
import { local } from '../../App'

const tabs: TabProps[] = [
  {
    label: 'Товары',
    index: 0,
    to: 'products',
  },
  {
    label: 'Слайдер',
    index: 1,
    to: 'slider',
  },
]

const AdminPage: React.FC = () => {
  const [tab, setTab] = useState<number>(local.getItem('tab') ? parseInt(local.getItem('tab') as string) : 0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    local.setItem('tab', newValue.toString())
  }

  return (
    <div className="admin">
      <div className="container">
        <div className="admin-content">
          <Tabs
            value={tab}
            onChange={handleChange}
            orientation="vertical"
            variant="scrollable"
            className="admin-tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {tabs.map(({ index, label, to }) => (
              <Tab
                key={index}
                label={label}
                component={Link}
                to={to as string}
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
