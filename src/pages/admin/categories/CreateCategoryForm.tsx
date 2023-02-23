import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import FileInput from '../../../components/FileInput/FileInput'
import { CreateCategoryPayload } from '../../../contexts/productsFilters/types'

const createCategorySchema = object({
  name: string().nonempty(validationErrors.required('название')).max(30, validationErrors.max('название', 30)),
  img_ids: any().refine((data) => data.length, { message: validationErrors.required('изображение') }),
})

type CreateCategoryInput = TypeOf<typeof createCategorySchema>;

const CreateCategoryForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createCategory, getCategories } = useProductsFilters()
  const { createFiles } = useFiles()

  const methods = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
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

  const onSubmitHandler: SubmitHandler<CreateCategoryInput> = ({ name, img_ids }) => {
    setLoading(true)

    const payload: CreateCategoryPayload = {
      name,
      img_id: img_ids[0],
    }

    createCategory(payload).finally(() => {
      setLoading(false)
      getCategories()
    })
  }

  const handleCreateCategoryImg = (files: File[]) => {
    const payload: CreateFilesPayload = {
      files,
      path: 'categories/upload-img',
      key: 'img',
    }

    return createFiles(payload)
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

        <FormProvider {...methods}>
          <FileInput
            onDropPromise={handleCreateCategoryImg}
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
          Создать
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CreateCategoryForm
