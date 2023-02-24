import React, { useEffect, useState } from 'react'
import { number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { Brand } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import MultiSelectInput from '../../../components/Selects/MultiSelectInput'

const editCategorySchema = object({
  name: string().nonempty(validationErrors.required('название')).max(30, validationErrors.max('название', 30)),
  category_ids: number().array(),
})

type EditCategoryInput = TypeOf<typeof editCategorySchema>;

type Props = {
  record: Brand
}

const EditBrandForm: React.FC<Props> = ({ record }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { editBrand, getBrands, categories, getCategories } = useProductsFilters()

  const methods = useForm<EditCategoryInput>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: record.name,
      category_ids: record.category_ids,
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

    editBrand(record.id, data).finally(() => {
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
        Редактировать бренд
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
          <MultiSelectInput
            label="Категории"
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
          Сохранить
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default EditBrandForm
