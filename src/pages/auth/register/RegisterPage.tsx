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
import Checkbox from '@mui/material/Checkbox'

import { RegisterPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../validationErrors'

const registerSchema = object({
  name: string()
    .max(32, validationErrors.max('имя', 32)),
  email: string()
    .nonempty(validationErrors.required('почта'))
    .email(validationErrors.email()),
  password: string()
    .nonempty(validationErrors.required('пароль'))
    .min(8, validationErrors.min('пароль', 8))
    .max(32, validationErrors.max('пароль', 32)),
  passwordConfirm: string().nonempty(validationErrors.required('подтверждение пароля')),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Пароли не совпадают',
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
    <Box
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        sx={{ mb: 2 }}
        label='Имя'
        defaultValue="Savva"
        fullWidth
        // required
        error={!!errors['name']}
        helperText={errors['name'] ? errors['name'].message : ''}
        {...register('name')}
      />
      <TextField
        sx={{ mb: 2 }}
        label='Почта'
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
        label='Пароль'
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
        label='Подтверждение пароля'
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
        Вход
      </Link>

      <StyledLoadingButton
        variant='contained'
        fullWidth
        type='submit'
        loading={loading}
        sx={{ py: '0.8rem', mt: '1rem' }}
      >
        Зарегистрироваться
      </StyledLoadingButton>
    </Box>
  )
}

export default RegisterPage
