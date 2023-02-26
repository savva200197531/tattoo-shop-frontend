import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { useAuth } from '../../contexts/auth/AuthContext'
import { useOrders } from '../../contexts/orders/OrdersContext'
import { CreateOrderPayload } from '../../contexts/orders/types'
import { useCart } from '../../contexts/cart/CartContext'
import { StyledLoadingButton } from '../../components/StyledButtons'
import { validationErrors } from '../../helpers/validationErrors'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import './styles.scss'

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
  phone: string({ required_error: validationErrors.required('телефон') })
    .regex(new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'), 'Телефон указан неверно'),
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

const CheckoutForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createOrder } = useOrders()
  const { user, getUser } = useAuth()
  const { cart } = useCart()

  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      surname: 'Кашин',
      name: 'Савва',
      lastname: 'Игоревич',
      email: 'savva@mail.ru',
      phone: '79132537745',
      region: 'Новосибирск',
      city: 'Новосибирск',
      address: 'Мичурина 43',
      comment: `Тестовый комментарий`,
    },
  })

  const onSubmitHandler: SubmitHandler<CheckoutInput> = (data) => {
    const payload: CreateOrderPayload = {
      ...data,
      price: cart.totalPrice,
      user_id: user.id,
      payment_method: 'bank_card',
      phone: data.phone.replace(/\D/g, ''),
      return_url: 'http://localhost:3000/thanks',
    }

    createOrder(payload)
      .then(() => {
        getUser(user.id)
        // handleCreatePayment({
        //   price: cart.totalPrice,
        //   description: data.comment,
        //   return_url: 'http://localhost:3000/thanks',
        // })
      })
      .finally(() => {
        setLoading(false)
      })
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
    <Box
      component="form"
      className="checkout-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Typography variant="h5" component="h3" fontWeight={500} sx={{ mt: '50px', mb: '70px' }}>
        Информация о покупателе
      </Typography>

      <div className="checkout-form__user">
        <TextField
          sx={{ mb: 2 }}
          label="Фамилия"
          fullWidth
          error={!!errors['surname']}
          helperText={errors['surname'] ? errors['surname'].message : ''}
          {...register('surname')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Имя"
          fullWidth
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Отчество"
          fullWidth
          error={!!errors['lastname']}
          helperText={errors['lastname'] ? errors['lastname'].message : ''}
          {...register('lastname')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <InputMask
              sx={{ mb: 2 }}
              mask="+7\ (999) 999-99-99"
              label="Телефон"
              fullWidth
              error={!!errors['phone']}
              helperText={errors['phone'] ? errors['phone'].message : ''}
              onChange={field.onChange}
              value={field.value}
            >
              {/*// @ts-ignore*/}
              {(props) => <TextField {...props} />}
            </InputMask>
          )}
        />
      </div>

      <Typography variant="h5" component="h3" fontWeight={500} sx={{ mt: '50px', mb: '70px' }}>
        Доставка
      </Typography>

      <div className="checkout-form__delivery">
        <TextField
          sx={{ mb: 2 }}
          label="Регион"
          fullWidth
          error={!!errors['region']}
          helperText={errors['region'] ? errors['region'].message : ''}
          {...register('region')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Город"
          fullWidth
          error={!!errors['city']}
          helperText={errors['city'] ? errors['city'].message : ''}
          {...register('city')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Адрес"
          fullWidth
          error={!!errors['address']}
          helperText={errors['address'] ? errors['address'].message : ''}
          {...register('address')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Комментарий"
          className="checkout-form__delivery-comment"
          fullWidth
          rows={4}
          multiline
          error={!!errors['comment']}
          helperText={errors['comment'] ? errors['comment'].message : ''}
          {...register('comment')}
        />
      </div>

      <ListWithTitle
        options={[
          {
            title: 'Итого',
            text: `${cart.totalPrice} Р`,
          },
        ]}
      />

      <StyledLoadingButton
        variant="contained"
        className="checkout-form__button"
        fullWidth
        type="submit"
        loading={loading}
        sx={{ py: '0.8rem', mt: '1rem' }}
      >
        Перейти к оплате
      </StyledLoadingButton>
    </Box>
  )
}

export default CheckoutForm
