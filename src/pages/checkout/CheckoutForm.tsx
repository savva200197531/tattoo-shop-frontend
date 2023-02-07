import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { validationErrors } from '../../validationErrors'
import { PhoneMaskCustom } from '../../components/PhoneMaskCustom'

const checkoutSchema = object({
  // user data
  surname: string()
    .nonempty(validationErrors.required('фамилия'))
    .min(2, validationErrors.min('фамилия', 8))
    .max(32, validationErrors.max('фамилия', 32)),
  name: string()
    .nonempty(validationErrors.required('имя'))
    .min(2, validationErrors.min('имя', 8))
    .max(32, validationErrors.max('имя', 32)),
  lastname: string()
    .nonempty(validationErrors.required('отчество'))
    .min(2, validationErrors.min('отчество', 8))
    .max(32, validationErrors.max('отчество', 32)),
  email: string().nonempty(validationErrors.required('почта')).email(validationErrors.email()),
  phone: string().nonempty(validationErrors.required('телефон')).regex(new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')),
  // address
  region: string()
    .nonempty(validationErrors.required('регион'))
    .max(32, validationErrors.max('регион', 16)),
  city: string()
    .nonempty(validationErrors.required('город'))
    .max(32, validationErrors.max('город', 16)),
  address: string()
    .nonempty(validationErrors.required('адрес'))
    .max(32, validationErrors.max('адрес', 60)),
  comment: string().max(32, validationErrors.max('комментарий', 128)),
})

type CheckoutInput = TypeOf<typeof checkoutSchema>;

const CreateProductForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmitHandler: SubmitHandler<CheckoutInput> = (payload) => {
    console.log(payload)

    setLoading(true)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Box className="checkout-form">
      <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Оформление заказа
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/*user data*/}
        <TextField
          sx={{ mb: 2 }}
          label="Фамилия"
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Имя"
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Отчество"
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Телефон"
          fullWidth
          required
          InputProps={{
            inputComponent: PhoneMaskCustom as any,
          }}
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          id="formatted-numberformat-input"
          {...register('name')}
        />


        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Перейти к оплате
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default CreateProductForm
