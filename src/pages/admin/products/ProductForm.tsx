import React, { useEffect, useState } from 'react'
import { any, number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'

import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import { Brand, Category } from '../../../contexts/productsFilters/types'
import { Product } from '../../../contexts/products/types'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputNumber from '../../../components/FormInputs/Text/FormInputNumber'
import FormInputSelect from '../../../components/FormInputs/Select/FormInputSelect'

const productSchema = object({
  name: string({
    errorMap: () => {
      return { message: validationErrors.required('название товара') }
    },
  })
    .nonempty(validationErrors.required('название товара'))
    .min(2, validationErrors.min('название товара', 2)),
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

export type ProductInput = TypeOf<typeof productSchema>;

type Props = {
  record?: Product
  onSubmit: (data: ProductInput) => Promise<any>
  title: string
  buttonTitle: string
}

const ProductForm: React.FC<Props> = ({ record, onSubmit, buttonTitle, title }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories, getBrands } = useProductsFilters()
  const { createFiles } = useFiles()

  const methods = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...record,
      img_ids: record?.img_ids || [],
    },
  })

  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    watch,
  } = methods

  const category_id = watch('category_id')

  const onSubmitHandler: SubmitHandler<ProductInput> = (data) => {
    setLoading(true)

    onSubmit(data)
      .finally(() => {
        setLoading(false)
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
    getCategories().then(data => setCategories(data)).catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    if (category_id) {
      getBrands({ category_id })
        .then(data => {
          setBrands(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [category_id])


  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Box className="product-form">
      <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
        {title}
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormProvider {...methods}>
          <FormInputText label="Название товара" name="name" />

          {/*<TextField*/}
          {/*  sx={{ mb: 2 }}*/}
          {/*  label=""*/}
          {/*  fullWidth*/}
          {/*  required*/}
          {/*  error={!!errors['']}*/}
          {/*  helperText={errors['count'] ? errors['count'].message : ''}*/}
          {/*  {...register('count', { valueAsNumber: true })}*/}
          {/*/>*/}

          <FormInputNumber label="Количество товара" name="count"/>

          <FormInputNumber label="Цена" name="price"/>

          <FormInputSelect
            label="Категория товара"
            name="category_id"
            options={categories}
          />

          <FormInputSelect
            label="Бренд"
            name="brand_id"
            options={brands}
          />

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
          {buttonTitle}
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default ProductForm
