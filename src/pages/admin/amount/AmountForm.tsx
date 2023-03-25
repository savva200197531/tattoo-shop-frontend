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
import { Category } from '../../../contexts/productsFilters/CategoriesContext/types'
import { Amount } from '../../../contexts/productsFilters/AmountContext/types'

const amountSchema = object({
  name: string().nonempty(validationErrors.required('обьем')).max(30, validationErrors.max('обьем', 30)),
  category_ids: number().array(),
})

export type AmountInput = TypeOf<typeof amountSchema>;

type Props = {
  record?: Amount
  onSubmit: (data: AmountInput) => Promise<any>
  title: string
  buttonTitle: string
}

const AmountForm: React.FC<Props> = ({ record, onSubmit, buttonTitle, title }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories } = useCategories()

  const methods = useForm<AmountInput>({
    resolver: zodResolver(amountSchema),
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

  const onSubmitHandler: SubmitHandler<AmountInput> = (data) => {
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

  useEffect(() => {
    getCategories().then(data => setCategories(data)).catch(error => {
      console.log(error)
    })
  }, [])

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
          <FormInputText name="name" label="Обьем (мл)"/>

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

export default AmountForm
