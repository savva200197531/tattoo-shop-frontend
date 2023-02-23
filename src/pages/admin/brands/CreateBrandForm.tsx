import React, { useEffect, useState } from 'react'
import { number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import MultiSelect from '../../../components/MultiSelect'

const createCategorySchema = object({
  name: string().nonempty(validationErrors.required('название')).max(30, validationErrors.max('название', 30)),
  category_ids: number().array(),
})

type CreateCategoryInput = TypeOf<typeof createCategorySchema>;

const CreateBrandForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createBrand, getCategories, getBrands, categories } = useProductsFilters()

  const methods = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      category_ids: [],
    },
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<CreateCategoryInput> = (data) => {
    setLoading(true)

    createBrand(data).finally(() => {
      setLoading(false)
      getBrands()
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

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Box className="product-form">
      <Typography variant="h5" component="h5" sx={{ mb: '2rem' }} textAlign="center">
        Создать бренд
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

        <FormProvider {...methods}>
          <MultiSelect
            name="category_ids"
            options={categories}
          />
        </FormProvider>

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

export default CreateBrandForm
