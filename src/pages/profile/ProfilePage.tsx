import React, { useState } from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { StyledButton } from '../../components/StyledButtons'
import { TabProps } from '../../components/TabPanel/TabPanel'
import { Tab, Tabs } from '@mui/material'
import { local } from '../../App'

const tabs: TabProps[] = [
  {
    label: 'Заказы',
    index: 0,
    to: 'orders',
  },
]

const ProfilePage: React.FC = () => {
  const [tab, setTab] = useState<number>(local.getItem('tab') ? parseInt(local.getItem('tab') as string) : 0)

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    local.setItem('tab', newValue.toString())
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-content">
          <div className="profile-tabs">
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

            <StyledButton variant="contained" onClick={logout}>Выйти</StyledButton>
            <StyledButton variant="contained" onClick={() => navigate('/admin')}>Админка</StyledButton>
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
