import React, { useEffect, useState } from 'react'
import { any, number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

import { useProducts } from '../../../contexts/products/ProductsContext'
import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'

const createProductSchema = object({
  name: string()
    .nonempty(validationErrors.required('название товара'))
    .min(2, validationErrors.min('название товара', 2))
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
  category_id: number({
    errorMap: () => {
      return { message: validationErrors.required('категория товара') }
    },
  }),
  img_ids: any().optional(),
})

type CreateProductInput = TypeOf<typeof createProductSchema>;

const CreateProductForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createProduct, getProducts } = useProducts()
  const { getCategories, categories } = useProductsFilters()
  const { createFiles } = useFiles()

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      img_ids: [],
    },
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true)

    createProduct(data).finally(() => {
      setLoading(false)
      getProducts()
    })
  }

  const handleCreateProductImg = (files: File[]) => {
    const payload: CreateFilesPayload = {
      files,
      path: 'products/upload-images',
      key: 'images',
    }

    return createFiles(payload)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Box className="product-form">
      <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Создать товар
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
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

        <FormControl fullWidth>
          <InputLabel>Категория товара</InputLabel>
          <Select
            error={!!errors['category_id']}
            label="Категория товара"
            {...register('category_id', { valueAsNumber: true })}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors['category_id'] ? errors['category_id'].message : ''}</FormHelperText>
        </FormControl>

        <FormProvider {...methods}>
          <FileInput
            onDropPromise={handleCreateProductImg}
            multiple
            name="img_ids"
            accept={{
              'image/png': ACCEPTED_IMAGE_TYPES,
            }}
          />
        </FormProvider>

        <StyledLoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Создать товар
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CreateProductForm
