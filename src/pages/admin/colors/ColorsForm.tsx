import React, { useEffect, useState } from 'react'
import { number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputSelectMultiple from '../../../components/FormInputs/Select/FormInputSelectMultiple'
import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import { Color } from '../../../contexts/productsFilters/ColorsContext/types'

const colorSchema = object({
  name: string({ required_error: validationErrors.required('название') })
    .nonempty(validationErrors.required('название'))
    .max(30, validationErrors.max('название', 30)),
  value: string({ required_error: validationErrors.required('цвет') })
    .nonempty(validationErrors.required('цвет')),
  category_ids: number().array(),
})

export type ColorInput = TypeOf<typeof colorSchema>;

type Props = {
  record?: Color
  onSubmit: (data: ColorInput) => Promise<any>
  title: string
  buttonTitle: string
}

const ColorsForm: React.FC<Props> = ({ record, onSubmit, buttonTitle, title }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { categories } = useCategories()

  const methods = useForm<ColorInput>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      ...record,
      category_ids: record?.category_ids || [],
    },
  })

  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods

  const onSubmitHandler: SubmitHandler<ColorInput> = (data) => {
    setLoading(true)

    onSubmit(data).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    console.log('errors', errors)
  }, [errors])

  return (
    <Box>
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

          <FormInputText name="value" type="color"/>

          <FormInputSelectMultiple label="Категории" name="category_ids" options={categories}/>
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

export default ColorsForm
