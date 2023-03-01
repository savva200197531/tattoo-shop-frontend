import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import FileInput from '../../../components/FileInput/FileInput'
import { Category } from '../../../contexts/productsFilters/types'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'

const categorySchema = object({
  name: string().nonempty(validationErrors.required('название')).max(30, validationErrors.max('название', 30)),
  img_ids: any().refine((data) => data.length, { message: validationErrors.required('изображение') }),
})

export type CategoryInput = TypeOf<typeof categorySchema>;

type Props = {
  record?: Category
  onSubmit: (data: CategoryInput) => Promise<any>
  title: string
  buttonTitle: string
}

const CategoryForm: React.FC<Props> = ({ record, onSubmit, buttonTitle, title }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createFiles } = useFiles()

  const methods = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      ...record,
      img_ids: record?.img_id ? [record?.img_id] : [],
    },
  })

  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<CategoryInput> = (data) => {
    setLoading(true)

    onSubmit(data).finally(() => {
      setLoading(false)
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
        {title}
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormProvider {...methods}>
          <FormInputText name="name" label="Название"/>

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
          {buttonTitle}
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CategoryForm
