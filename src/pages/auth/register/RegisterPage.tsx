import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'

import { Box } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'

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
  // terms: literal(true, {
  //   invalid_type_error: 'Accept Terms is required',
  // }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Пароли не совпадают',
})

type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { register: registerUser } = useAuth()
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

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
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FormProvider {...methods}>
        <FormInputText name="name" label="Имя"/>

        <FormInputText name="email" label="Почта" type="email"/>

        <FormInputText name="password" label="Пароль" type="password"/>

        <FormInputText name="passwordConfirm" label="Подтверждение пароля" type="password"/>
      </FormProvider>

      {/*<FormGroup>*/}
      {/*  <FormControlLabel*/}
      {/*    control={<Checkbox required />}*/}
      {/*    {...register('terms')}*/}
      {/*    label={*/}
      {/*      <Typography color={errors['terms'] ? 'error' : 'inherit'}>*/}
      {/*        Accept Terms and Conditions*/}
      {/*      </Typography>*/}
      {/*    }*/}
      {/*  />*/}
      {/*  <FormHelperText error={!!errors['terms']}>*/}
      {/*    {errors['terms'] ? errors['terms'].message : ''}*/}
      {/*  </FormHelperText>*/}
      {/*</FormGroup>*/}

      <Link to="/login">
        Войти
      </Link>

      <StyledLoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
        sx={{ py: '0.8rem', mt: '1rem' }}
      >
        Зарегистрироваться
      </StyledLoadingButton>
    </Box>
  )
}

export default RegisterPage
