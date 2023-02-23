import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { Category, EditCategoryPayload } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import FileInput from '../../../components/FileInput/FileInput'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'

const editCategorySchema = object({
  name: string().nonempty(validationErrors.required('название')).max(30, validationErrors.max('название', 30)),
  img_ids: any().refine((data) => data.length, { message: validationErrors.required('изображение') }),
})

type EditCategoryInput = TypeOf<typeof editCategorySchema>;

type Props = {
  record: Category
}

const EditCategoryForm: React.FC<Props> = ({ record }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { editCategory, getCategories } = useProductsFilters()
  const { createFiles } = useFiles()

  const methods = useForm<EditCategoryInput>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: record.name,
      img_ids: [record.img_id],
    },
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<EditCategoryInput> = ({ name, img_ids }) => {
    setLoading(true)

    const payload: EditCategoryPayload = {
      name,
      img_id: img_ids[0],
    }

    editCategory(record.id, payload).finally(() => {
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
          Сохранить
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default EditCategoryForm
