import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { validationErrors } from '../../../validationErrors'
import FileInput from '../../../components/FileInput/FileInput'
import { StyledLoadingButton } from '../../../components/StyledButtons'
import { useSlider } from '../../../contexts/slider/SliderContext'

const createSlideSchema = object({
  title: string()
    .nonempty(validationErrors.required('заголовок'))
    .min(2, validationErrors.min('заголовок', 2))
    .max(32, validationErrors.max('заголовок', 32)),
  description: string()
    .nonempty(validationErrors.required('описание'))
    .min(8, validationErrors.min('описание', 8))
    .max(128, validationErrors.max('описание', 128)),
  bg_color: string()
    .nonempty(validationErrors.required('цвет фона')),
  img: any().optional(),
})

type CreateSlideInput = TypeOf<typeof createSlideSchema>;

const CreateSlideForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createSlide, getSlides } = useSlider()

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
  } = useForm<CreateSlideInput>({
    resolver: zodResolver(createSlideSchema),
  })

  const onSubmitHandler: SubmitHandler<CreateSlideInput> = (payload) => {
    setLoading(true)

    createSlide(payload).finally(() => {
      setLoading(false)
      getSlides()
    })
  }

  const onFileChange = (value: any) => {
    if (!value[0]) {
      setValue('img', undefined)
    } else {
      setValue('img', value[0])
    }
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
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Создать слайд
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Заголовок"
          defaultValue="Слайд"
          fullWidth
          required
          error={!!errors['title']}
          helperText={errors['title'] ? errors['title'].message : ''}
          {...register('title')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Описание"
          defaultValue="Описание"
          fullWidth
          required
          rows={4}
          multiline
          error={!!errors['description']}
          helperText={errors['description'] ? errors['description'].message : ''}
          {...register('description')}
        />

        <TextField
          sx={{ mb: 2 }}
          label="Цвет фона"
          defaultValue="Описание"
          fullWidth
          required
          type="color"
          error={!!errors['bg_color']}
          helperText={errors['bg_color'] ? errors['bg_color'].message : ''}
          {...register('bg_color')}
        />

        <FileInput filesLimit={1} onChange={onFileChange} />

        <StyledLoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Создать слайд
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default CreateSlideForm
