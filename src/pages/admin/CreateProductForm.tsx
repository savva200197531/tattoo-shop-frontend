import React, { useEffect, useState } from 'react'
import { number, object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { validationErrors } from '../../validationErrors'
import { useProducts } from '../../contexts/products/ProductsContext'
import FileInput from '../../components/FileInput/FileInput'

const createProductSchema = object({
  name: string()
    .nonempty(validationErrors.required('название товара'))
    .min(2, validationErrors.min('название товара', 8))
    .max(32, validationErrors.max('название товара', 32)),
  count: number({
    errorMap: () => {
      return { message: validationErrors.required('количество товара') }
    },
  })
    .min(0, validationErrors.min('количество товара', 0)),
  price: number({
    errorMap: () => {
      return { message: validationErrors.required('цена') }
    },
  })
    .min(0, validationErrors.min('цена', 0)),
})

type CreateProductInput = TypeOf<typeof createProductSchema>;

const CreateProductForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createProduct, getProducts } = useProducts()

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  })

  const onSubmitHandler: SubmitHandler<CreateProductInput> = (payload) => {
    setLoading(true)

    createProduct(payload).finally(() => {
      setLoading(false)
      getProducts()
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
    <Box className="product-form">
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Создать товар
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Название товара"
          defaultValue="Товар 1"
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Количество товара"
          defaultValue={12}
          fullWidth
          inputProps={{ inputMode: 'numeric' }}
          required
          type="number"
          error={!!errors['count']}
          helperText={errors['count'] ? errors['count'].message : ''}
          {...register('count', { valueAsNumber: true })}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Цена"
          defaultValue={3000}
          fullWidth
          inputProps={{ inputMode: 'numeric' }}
          required
          type="number"
          error={!!errors['price']}
          helperText={errors['price'] ? errors['price'].message : ''}
          {...register('price', { valueAsNumber: true })}
        />

        <FileInput />

        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Создать товар
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default CreateProductForm
