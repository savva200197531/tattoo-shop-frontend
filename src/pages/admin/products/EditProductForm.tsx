import React, { useEffect, useState } from 'react'
import { any, number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { useProducts } from '../../../contexts/products/ProductsContext'
import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import SelectInput from '../../../components/Selects/SelectInput'
import { Product } from '../../../contexts/products/types'

const editProductSchema = object({
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
  brand_id: number({
    errorMap: () => {
      return { message: validationErrors.required('бренд') }
    },
  }),
  img_ids: any().optional(),
})

type EditProductInput = TypeOf<typeof editProductSchema>;

type Props = {
  record: Product
}

const EditProductForm: React.FC<Props> = ({ record }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { editProduct, getProducts } = useProducts()
  const { getCategories, categories, getBrands, brands } = useProductsFilters()
  const { createFiles } = useFiles()

  const methods = useForm<EditProductInput>({
    resolver: zodResolver(editProductSchema),
    defaultValues: record,
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<EditProductInput> = (data) => {
    setLoading(true)

    editProduct(record.id, data).finally(() => {
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
    getBrands()
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Box className="product-form">
      <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Редактировать товар
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
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Количество товара"
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
          fullWidth
          inputProps={{ inputMode: 'numeric' }}
          required
          type="number"
          error={!!errors['price']}
          helperText={errors['price'] ? errors['price'].message : ''}
          {...register('price', { valueAsNumber: true })}
        />

        <FormProvider {...methods}>
          <SelectInput
            label="Категория товара"
            name="category_id"
            options={categories}
          />
        </FormProvider>

        <FormProvider {...methods}>
          <SelectInput
            label="Бренд"
            name="brand_id"
            options={brands}
          />
        </FormProvider>

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
          Сохранить
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default EditProductForm
