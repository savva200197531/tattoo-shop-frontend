import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { object, string, TypeOf } from 'zod'
import { LoginPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'

const loginSchema = object({
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth()
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler: SubmitHandler<LoginInput> = ({ email, password }) => {
    const payload: LoginPayload = {
      email,
      password,
    }

    setLoading(true)

    login(payload).finally(() => {
      setLoading(false)
    })
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Login
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label='Email'
          defaultValue="yakikbutovski353@gmail.com"
          fullWidth
          required
          type='email'
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />
        <TextField
          sx={{ mb: 2 }}
          label='Password'
          defaultValue="123123123"
          fullWidth
          required
          type='password'
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />

        <Link to="/register">
          Register
        </Link>

        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default LoginPage
