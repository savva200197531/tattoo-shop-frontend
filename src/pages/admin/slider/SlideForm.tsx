import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'

import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { useSlider } from '../../../contexts/slider/SliderContext'
import { Slide } from '../../../contexts/slider/types'
import { validationErrors } from '../../../helpers/validationErrors'
import { ACCEPTED_IMAGE_TYPES, CreateFilesPayload } from '../../../contexts/files/types'
import { useFiles } from '../../../contexts/files/FilesContext'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'

const slideSchema = object({
  link: string()
    .max(200, validationErrors.max('ссылка', 200)),
  img_ids: any().refine((data) => data.length, { message: validationErrors.required('изображение') }),
})

export type SlideInput = TypeOf<typeof slideSchema>;

type Props = {
  record?: Slide
  onSubmit: (data: SlideInput) => Promise<any>
  title: string
  buttonTitle: string
}

const SlideForm: React.FC<Props> = ({ record, onSubmit, buttonTitle, title }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getSlides } = useSlider()
  const { createFiles } = useFiles()

  const methods = useForm<SlideInput>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      ...record,
      img_ids: record?.img_id ? [record.img_id] : [],
    },
  })

  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<SlideInput> = (data) => {
    setLoading(true)

    onSubmit(data)
      .then(() => getSlides())
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCreateSlideImg = (files: File[]) => {
    const payload: CreateFilesPayload = {
      files,
      path: 'slider/upload-img',
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
          <FormInputText label="Ссылка" name="link"/>

          <FileInput
            onDropPromise={handleCreateSlideImg}
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

export default SlideForm
