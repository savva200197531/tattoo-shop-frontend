import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { useSlider } from '../../../contexts/slider/SliderContext'
import { CreateSlidePayload } from '../../../contexts/slider/types'
import { validationErrors } from '../../../helpers/validationErrors'

const ACCEPTED_IMAGE_TYPES = ['.jpeg', '.jpg', '.png', '.webp', '.svg']

const createSlideSchema = object({
  link: string()
    .max(200, validationErrors.max('ссылка', 200)),
  img_ids: any().refine((data) => data.length, { message: validationErrors.required('файл') }),
})

type CreateSlideInput = TypeOf<typeof createSlideSchema>;

const CreateSlideForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createSlide, getSlides, createSlideImg } = useSlider()

  const methods = useForm<CreateSlideInput>({
    resolver: zodResolver(createSlideSchema),
    defaultValues: {
      link: '',
      img_ids: [],
    },
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<CreateSlideInput> = ({ img_ids, link }) => {
    setLoading(true)

    const payload: CreateSlidePayload = {
      link,
      img_id: img_ids[0],
    }

    createSlide(payload).finally(() => {
      setLoading(false)
      getSlides()
    })
  }

  const handleCreateSlideImg = (files: File[]) => createSlideImg(files[0])

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
        Создать слайд
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Ссылка"
          defaultValue="Ссылка"
          fullWidth
          error={!!errors['link']}
          helperText={errors['link'] ? errors['link'].message : ''}
          {...register('link')}
        />

        <FormProvider {...methods}>
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
          Создать
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CreateSlideForm
