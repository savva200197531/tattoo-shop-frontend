import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { Category } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'

const editCategorySchema = object({
  name: string().max(30, validationErrors.max('название', 30)),
})

type EditCategoryInput = TypeOf<typeof editCategorySchema>;

type Props = {
  record: Category
}

const EditCategoryForm: React.FC<Props> = ({ record }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { editCategory, getCategories } = useProductsFilters()

  const methods = useForm<EditCategoryInput>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: record.name,
    },
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<EditCategoryInput> = (data) => {
    setLoading(true)

    editCategory(record.id, data).finally(() => {
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
        Редактировать категорию
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
          Сохранить
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default EditCategoryForm
