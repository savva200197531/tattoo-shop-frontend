import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField } from '@mui/material'
import { object, string, TypeOf } from 'zod'
import { LoginPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../validationErrors'

const loginSchema = object({
  email: string().nonempty(validationErrors.required('почта')).email(validationErrors.email()),
  password: string()
    .nonempty(validationErrors.required('пароль'))
    .min(8, validationErrors.min('пароль', 8))
    .max(32, validationErrors.max('пароль', 32)),
})

type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { login } = useAuth()
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmitHandler: SubmitHandler<LoginInput> = ({ email, password }) => {
    const payload: LoginPayload = {
      email,
      password,
    }

    setLoading(true)

    login(payload).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        sx={{ mb: 2 }}
        label="Почта"
        defaultValue="yakikbutovski353@gmail.com"
        fullWidth
        required
        type="email"
        error={!!errors['email']}
        helperText={errors['email'] ? errors['email'].message : ''}
        {...register('email')}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Пароль"
        defaultValue="123123123"
        fullWidth
        required
        type="password"
        error={!!errors['password']}
        helperText={errors['password'] ? errors['password'].message : ''}
        {...register('password')}
      />

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
