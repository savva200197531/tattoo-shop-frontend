import { Button, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import './styles.scss'
import { Logout, Settings } from '@mui/icons-material'
import Svg from '../Svg/Svg'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProfileIcon: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()
  const { logout, user, isUserExist } = useAuth()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick} type="button" color="secondary" sx={{ p: '6px' }}>
        <Svg text="Меню" className="base-icon" id="menu"/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            'overflow': 'visible',
            'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            'mt': 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile/info')}>
          <ListItemIcon>
            <Svg width={26} height={26} id="profile"/>
          </ListItemIcon>
          Профиль
        </MenuItem>
        <Divider/>
        {user.role === 'Admin' && (
          <MenuItem onClick={() => navigate('/admin/products')}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Админка
          </MenuItem>
        )}
        {isUserExist && (
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small"/>
            </ListItemIcon>
            Выйти
          </MenuItem>
        )}
        {!isUserExist && (
          <MenuItem onClick={logout}>
            {/*<ListItemIcon>*/}
            {/*  <Logout fontSize="small"/>*/}
            {/*</ListItemIcon>*/}
            Вход
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default ProfileIcon
