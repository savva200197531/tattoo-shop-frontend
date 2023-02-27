import React from 'react'
import { Typography } from '@mui/material'
import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import AuthButton from '../../../components/AuthButton'

const TabInfo = () => {
  const { user, isUserExist } = useAuth()

  return (
    <div>
      <Typography variant="h4" component="h1" fontWeight={500} textAlign="center" sx={{ mb: '70px' }}>
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
    </div>
  )
}

export default TabInfo
