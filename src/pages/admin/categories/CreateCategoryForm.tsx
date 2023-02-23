import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'

const createCategorySchema = object({
  name: string().max(30, validationErrors.max('ссылка', 30)),
})

type CreateCategoryInput = TypeOf<typeof createCategorySchema>;

const CreateCategoryForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createCategory, getCategories } = useProductsFilters()

  const methods = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<CreateCategoryInput> = (data) => {
    setLoading(true)

    createCategory(data).finally(() => {
      setLoading(false)
      getCategories()
    })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    console.log('errors', errors)
  }, [errors])

  return (
    <Box className="product-form">
      <Typography variant="h5" component="h5" sx={{ mb: '2rem' }} textAlign="center">
        Создать категорию
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Название"
          fullWidth
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <StyledLoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Создать
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CreateCategoryForm
