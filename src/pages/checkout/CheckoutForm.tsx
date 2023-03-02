import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'

import { useAuth } from '../../contexts/auth/AuthContext'
import { useOrders } from '../../contexts/orders/OrdersContext'
import { CreateOrderPayload } from '../../contexts/orders/types'
import { useCart } from '../../contexts/cart/CartContext'
import { StyledLoadingButton } from '../../components/StyledButtons'
import { validationErrors } from '../../helpers/validationErrors'
import ListWithTitle from '../../components/ListWithTitle/ListWithTitle'
import FormInputText from '../../components/FormInputs/Text/FormInputText'
import FormInputMasked from '../../components/FormInputs/Text/FormInputMasked'
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

  const mobile = useMediaQuery('(max-width:750px)')
  const { createOrder } = useOrders()
  const { user, getUser } = useAuth()
  const { cart } = useCart()

  const methods = useForm<CheckoutInput>({
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

  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

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
      <Typography variant="h5" component="h3" fontWeight={500}>
        Информация о покупателе
      </Typography>

      <FormProvider {...methods}>
        <Stack className="checkout-form__user" direction={mobile ? 'column' : 'row'} spacing={2}>
          <FormInputText sx={{ mb: 0 }} name="surname" label="Фамилия"/>

          <FormInputText sx={{ mb: 0 }} name="name" label="Имя"/>

          <FormInputText sx={{ mb: 0 }} name="lastname" label="Отчество"/>

          <FormInputText sx={{ mb: 0 }} name="email" label="Почта" type="email"/>

          <FormInputMasked name="phone" label="Телефон" mask="+7\ (999) 999-99-99"/>
        </Stack>

        <Typography variant="h5" component="h3" fontWeight={500}>
          Доставка
        </Typography>

        <div className="checkout-form__delivery-description">
          <p>
            Доставка по барнаулу или самовывоз - бесплатно.
          </p>
          <p>
            Доставка в другие регионы обсуждается индивидуально.
          </p>
        </div>

        <Stack className="checkout-form__delivery" direction={mobile ? 'column' : 'row'} spacing={2}>
          <FormInputText sx={{ mb: 0 }} name="region" label="Регион"/>

          <FormInputText sx={{ mb: 0 }} name="city" label="Город"/>

          <FormInputText sx={{ mb: 0 }} name="address" label="Адрес"/>
        </Stack>

        <FormInputText
          name="comment"
          label="Комментарий"
          className="checkout-form__delivery-comment"
          rows={4}
          sx={{ mb: 2, mt: 2 }}
          multiline
        />
      </FormProvider>

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
