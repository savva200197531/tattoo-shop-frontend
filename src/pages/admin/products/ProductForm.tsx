import React, { useEffect, useState } from 'react'
import { any, number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextareaAutosize, Typography } from '@mui/material'

import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import { Product } from '../../../contexts/products/types'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputNumber from '../../../components/FormInputs/Text/FormInputNumber'
import FormInputSelect from '../../../components/FormInputs/Select/FormInputSelect'
import './styles.scss'
import { Category } from '../../../contexts/productsFilters/CategoriesContext/types'
import { Brand } from '../../../contexts/productsFilters/BrandsContext/types'
import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import { useBrands } from '../../../contexts/productsFilters/BrandsContext/BrandsContext'
import { Color } from '../../../contexts/productsFilters/ColorsContext/types'
import { Amount } from '../../../contexts/productsFilters/AmountContext/types'
import { useColors } from '../../../contexts/productsFilters/ColorsContext/ColorsContext'
import { useAmount } from '../../../contexts/productsFilters/AmountContext/AmountContext'
import ColorBadge from '../../../components/ColorLabel/ColorBadge'

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
  description: string().optional(),
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
  color_id: number().optional(),
  amount_id: number().optional(),
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
  const [colors, setColors] = useState<Color[]>([])
  const [amounts, setAmounts] = useState<Amount[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories } = useCategories()
  const { getBrands } = useBrands()
  const { createFiles } = useFiles()
  const { getColors } = useColors()
  const { getAmounts } = useAmount()

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

  const getCategory = (): Category | undefined => categories.find(category => category.id === category_id)

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
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

      getColors({ category_id })
        .then(data => {
          setColors(data)
        })
        .catch(error => {
          console.log(error)
        })

      getAmounts({ category_id })
        .then(data => {
          setAmounts(data)
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
    <Box>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ mb: '2rem' }}>
        {title}
      </Typography>
      <Box
        component="form"
        className="product-form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormProvider {...methods}>
          <FormInputText label="Название товара" name="name" />

          <FormInputNumber label="Количество товара" name="count"/>

          <FormInputNumber label="Цена" name="price"/>

          <FormInputText
            InputProps={{
              inputComponent: TextareaAutosize,
            }}
            name="description"
            label="Описание"
            rows={4}
            multiline
          />

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

          <FormInputSelect
            label="Цвет"
            name="color_id"
            options={colors}
            optionIcon={(option: any) => <ColorBadge color={option.value} />}
          />

          <FormInputSelect
            label="Обьем"
            name="amount_id"
            options={amounts}
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
