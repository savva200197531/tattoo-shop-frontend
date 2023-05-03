import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'

import { LoginPayload } from '../../../contexts/auth/types'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import { siteKey } from '../../../env'

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
  const [captcha, setCaptcha] = useState<string | null>(null)

  const { login } = useAuth()
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    // defaultValues: {
    //   email: 'test@mail.ru',
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

      <ReCAPTCHA style={{ marginBottom: '10px' }} sitekey={siteKey} onChange={token => setCaptcha(token)} />

      <Link to="/register">
        Регистрация
      </Link>

      <StyledLoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
        disabled={!captcha}
        sx={{ py: '0.8rem', mt: '1rem' }}
      >
        Войти
      </StyledLoadingButton>
    </Box>
  )
}

export default LoginPage
