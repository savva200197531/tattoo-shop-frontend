import React, { useEffect, useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import { useSlider } from '../../../contexts/slider/SliderContext'
import { EditSlidePayload, Slide } from '../../../contexts/slider/types'
import FileInput from '../../../components/FileInput/FileInput'

const ACCEPTED_IMAGE_TYPES = ['.jpeg', '.jpg', '.png', '.webp', '.svg']

const editSlideSchema = object({
  link: string()
    .max(200, validationErrors.max('ссылка', 200)),
  img_ids: any().refine((data) => data.length, { message: validationErrors.required('файл') }),
})

type EditSlideInput = TypeOf<typeof editSlideSchema>;

type Props = {
  record: Slide
}

const EditSlideForm: React.FC<Props> = ({ record }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { editSlide, getSlides, createSlideImg } = useSlider()

  const methods = useForm<EditSlideInput>({
    resolver: zodResolver(editSlideSchema),
    defaultValues: {
      link: record.link,
      img_ids: [record.img_id],
    },
  })

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<EditSlideInput> = ({ link, img_ids }) => {
    setLoading(true)

    const payload: EditSlidePayload = {
      link,
      img_id: img_ids[0],
    }

    editSlide(record.id, payload).finally(() => {
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
        Редактировать слайд
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
          Сохранить
        </StyledLoadingButton>
      </Box>
    </Box>
  )
}

export default EditSlideForm
