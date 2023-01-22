import React, { useEffect, useState } from 'react'
import { number, object, string, TypeOf } from 'zod'
import { validationErrors } from '../../validationErrors'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProducts } from '../../contexts/products/ProductsContext'
import { Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const createProductSchema = object({
  name: string()
    .nonempty(validationErrors.required('Название товара'))
    .min(2, validationErrors.min('Название товара', 8))
    .max(32, validationErrors.max('Название товара', 32)),
  count: number()
    .min(0, validationErrors.min('Количество товара', 0)),
  price: number()
    .min(0, validationErrors.min('Цена', 0))
})

type CreateProductInput = TypeOf<typeof createProductSchema>;

const CreateProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createProduct } = useProducts()

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmitHandler: SubmitHandler<CreateProductInput> = (payload) => {
    setLoading(true)

    createProduct(payload).finally(() => {
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
        Create product
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
          {...register('price',  { valueAsNumber: true })}
        />

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
