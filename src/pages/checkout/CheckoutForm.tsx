import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { validationErrors } from '../../validationErrors'
import { PhoneMaskCustom } from '../../components/PhoneMaskCustom'
import { useAuth } from '../../contexts/auth/AuthContext'
import Spinner from '../../components/Spinner/Spinner'
import { useOrders } from '../../contexts/orders/OrdersContext'
import { CreateOrderPayload } from '../../contexts/orders/types'
import { useCart } from '../../contexts/cart/CartContext'
import { StyledLoadingButton } from '../../components/StyledButtons'
import { usePayment } from '../../contexts/payment/PaymentContext'
import { CreatePaymentPayload } from '../../contexts/payment/types'

const checkoutSchema = object({
  // user data
  surname: string()
    .nonempty(validationErrors.required('фамилия'))
    .min(2, validationErrors.min('фамилия', 2))
    .max(32, validationErrors.max('фамилия', 32)),
  name: string()
    .nonempty(validationErrors.required('имя'))
    .min(2, validationErrors.min('имя', 2))
    .max(32, validationErrors.max('имя', 32)),
  lastname: string()
    .nonempty(validationErrors.required('отчество'))
    .min(2, validationErrors.min('отчество', 2))
    .max(32, validationErrors.max('отчество', 32)),
  email: string().nonempty(validationErrors.required('почта')).email(validationErrors.email()),
  phone: string().nonempty(validationErrors.required('телефон')).regex(new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')),
  // address
  region: string()
    .nonempty(validationErrors.required('регион'))
    .max(32, validationErrors.max('регион', 32)),
  city: string()
    .nonempty(validationErrors.required('город'))
    .max(32, validationErrors.max('город', 32)),
  address: string()
    .nonempty(validationErrors.required('адрес'))
    .max(32, validationErrors.max('адрес', 32)),
  comment: string().max(128, validationErrors.max('комментарий', 128)),
})

type CheckoutInput = TypeOf<typeof checkoutSchema>;

const CreateProductForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [phoneValue, setPhoneValue] = useState<string>('9132537745')

  const { createOrder } = useOrders()
  const { createPayment } = usePayment()
  const { user, isUserExist, getUser } = useAuth()
  const { cart } = useCart()

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  })

  const handleCreatePayment = (data: CreatePaymentPayload) => {
    createPayment(data).finally(() => {
      setLoading(false)
    })
  }

  const onSubmitHandler: SubmitHandler<CheckoutInput> = (data) => {
    const payload: CreateOrderPayload = {
      ...data,
      price: cart.totalPrice,
      user_id: user.id,
      payment_method: 'bank_card',
    }

    setLoading(true)

    createOrder(payload)
      .then(() => {
        getUser(user.id)
        handleCreatePayment({
          price: cart.totalPrice,
          description: data.comment,
          return_url: 'http://localhost:3000/thanks',
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhoneValue(event.target.value)

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  if (!isUserExist) {
    return <Spinner/>
  }

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
          defaultValue="Кашин"
          fullWidth
          error={!!errors['surname']}
          helperText={errors['surname'] ? errors['surname'].message : ''}
          {...register('surname')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Имя"
          defaultValue={user.name}
          fullWidth
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Отчество"
          defaultValue="Игоревич"
          fullWidth
          error={!!errors['lastname']}
          helperText={errors['lastname'] ? errors['lastname'].message : ''}
          {...register('lastname')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Email"
          defaultValue={user.email}
          fullWidth
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Телефон"
          fullWidth
          InputProps={{
            inputComponent: PhoneMaskCustom as any,
          }}
          error={!!errors['phone']}
          helperText={errors['phone'] ? errors['phone'].message : ''}
          {...register('phone')}
          onChange={handlePhoneChange}
          value={phoneValue}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Регион"
          defaultValue="Новосибирск"
          fullWidth
          error={!!errors['region']}
          helperText={errors['region'] ? errors['region'].message : ''}
          {...register('region')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Город"
          defaultValue="Новосибирск"
          fullWidth
          error={!!errors['city']}
          helperText={errors['city'] ? errors['city'].message : ''}
          {...register('city')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Адрес"
          defaultValue="Мичурина 43"
          fullWidth
          error={!!errors['address']}
          helperText={errors['address'] ? errors['address'].message : ''}
          {...register('address')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Комментарий"
          defaultValue="Комментарий"
          fullWidth
          rows={4}
          multiline
          error={!!errors['comment']}
          helperText={errors['comment'] ? errors['comment'].message : ''}
          {...register('comment')}
        />

        <StyledLoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Перейти к оплате
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CreateProductForm
