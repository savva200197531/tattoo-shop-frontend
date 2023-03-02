import React from 'react'
import { Typography } from '@mui/material'
import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import { useAuth } from '../../../contexts/auth/AuthContext'
import AuthButton from '../../../components/AuthButton'
import { StyledButton } from '../../../components/StyledButtons'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

const TabInfo = () => {
  const { logout, user, isUserExist } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="profile-info">
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
        Личные данные
      </Typography>

      {isUserExist ? (
        <ListWithTitle
          options={[
            {
              title: 'Имя',
              text: user.name,
            },
            {
              title: 'Почта',
              text: (
                <>
                  {user.email}
                  {/*{user.isEmailConfirmed ? 'Почта подтверждена' : <StyledButton onClick={() => navigate('')}>Подтвердить почту</StyledButton>}*/}
                </>
              ),
            },
            // {
            //   title: 'Телефон',
            //   text: 'телефон',
            // },
          ]}
          className="bordered-box"
        />
      ) : <AuthButton />}

      <div className="profile-info__toolbar">
        {user.role === 'Admin' && <StyledButton fullWidth variant="contained" onClick={() => navigate('/admin/products')}>Админка</StyledButton>}

        {isUserExist && <StyledButton fullWidth variant="contained" onClick={logout}>Выйти</StyledButton>}
      </div>
    </div>
  )
}

export default TabInfo
