import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { literal, object, string, TypeOf } from 'zod'

import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import Checkbox from '@mui/material/Checkbox'

import { RegisterPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'

const registerSchema = object({
  name: string()
      .nonempty('Name is required')
      .max(32, 'Name must be less than 100 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
      .nonempty('Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
})

type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { register: registerUser } = useAuth()
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmitHandler: SubmitHandler<RegisterInput> = ({ email, password, name }) => {
    const payload: RegisterPayload = {
      email,
      password,
      name,
    }

    setLoading(true)

    registerUser(payload).finally(() => {
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
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Register
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label='Name'
          defaultValue="Savva"
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />
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
        <TextField
          sx={{ mb: 2 }}
          label='Confirm Password'
          defaultValue="123123123"
          fullWidth
          required
          type='password'
          error={!!errors['passwordConfirm']}
          helperText={
            errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
          }
          {...register('passwordConfirm')}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked={true} required />}
            {...register('terms')}
            label={
              <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                Accept Terms and Conditions
              </Typography>
            }
          />
          <FormHelperText error={!!errors['terms']}>
            {errors['terms'] ? errors['terms'].message : ''}
          </FormHelperText>
        </FormGroup>

        <Link to="/login">
          Login
        </Link>

        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Register
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default RegisterPage
