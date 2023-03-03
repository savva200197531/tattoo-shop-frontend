import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'

import { LoginPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'

const loginSchema = object({
  email: string({ required_error: validationErrors.required('почта') }).nonempty(validationErrors.required('почта')).email(validationErrors.email()),
  password: string({ required_error: validationErrors.required('пароль') })
    .nonempty(validationErrors.required('пароль'))
    .min(8, validationErrors.min('пароль', 8))
    .max(32, validationErrors.max('пароль', 32)),
})

type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { login } = useAuth()
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    // defaultValues: {
    //   email: 'yakikbutovski353@gmail.com',
    //   password: '123123123',
    // },
  })

  const {
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<LoginInput> = ({ email, password }) => {
    const payload: LoginPayload = {
      email,
      password,
    }

    setLoading(true)

    login(payload)
      .then(() => {
        reset()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FormProvider {...methods}>
        <FormInputText name="email" label="Почта" type="email"/>

        <FormInputText name="password" label="Пароль" type="password"/>
      </FormProvider>

      <Link to="/register">
        Регистрация
      </Link>

      <StyledLoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
        sx={{ py: '0.8rem', mt: '1rem' }}
      >
        Войти
      </StyledLoadingButton>
    </Box>
  )
}

export default LoginPage
