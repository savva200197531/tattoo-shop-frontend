import React, { useEffect, useState } from 'react'
import { number, object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import { validationErrors } from '../../../helpers/validationErrors'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputSelectMultiple from '../../../components/FormInputs/Select/FormInputSelectMultiple'
import { Brand } from '../../../contexts/productsFilters/BrandsContext/types'
import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'

const brandSchema = object({
  name: string().nonempty(validationErrors.required('название')).max(30, validationErrors.max('название', 30)),
  category_ids: number().array(),
})

export type BrandInput = TypeOf<typeof brandSchema>;

type Props = {
  record?: Brand
  onSubmit: (data: BrandInput) => Promise<any>
  title: string
  buttonTitle: string
}

const BrandForm: React.FC<Props> = ({ record, onSubmit, buttonTitle, title }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { categories } = useCategories()

  const methods = useForm<BrandInput>({
    resolver: zodResolver(brandSchema),
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

  const onSubmitHandler: SubmitHandler<BrandInput> = (data) => {
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

export default BrandForm
