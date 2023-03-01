import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { any, object, TypeOf } from 'zod'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames'

import Paper from '@mui/material/Paper'
import { zodResolver } from '@hookform/resolvers/zod'

import { StyledButton } from '../StyledButtons'
import CategoryFilter from './fields/CategoryFilter'
import SortFilter from './fields/SortFilter'
import BrandFilter from './fields/BrandFilter'
import PriceFilter from './fields/PriceFilter'

const filtersSchema = object({
  category: any().optional(),
  brand: any().optional(),
  sort: any().optional(),
  price: any().array().optional(),
})

export type FiltersInput = TypeOf<typeof filtersSchema>;

type Props = {
  mobile?: boolean
  handleClose?: () => void
}

const FiltersForm: React.FC<Props> = ({ mobile = false, handleClose }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  // const [key, setKey] = useState(0)

  const methods = useForm<FiltersInput>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      sort: searchParams.get('sort') ? Number(searchParams.get('sort')) : '',
      category: searchParams.get('category') ? Number(searchParams.get('category')) : '',
      brand: searchParams.get('brand') ? Number(searchParams.get('brand')) : '',
      price: [],
    },
  })

  const { reset, handleSubmit, getValues } = methods

  const onSubmitHandler: SubmitHandler<FiltersInput> = (data) => {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FiltersInput]

      if (value) {
        searchParams.set(key, value.toString())
      } else {
        searchParams.delete(key)
      }

      setSearchParams(searchParams)
    })
  }

  const handleReset = () => {
    const data = getValues()

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FiltersInput]

      if (value) {
        searchParams.delete(key)
      }

      setSearchParams(searchParams)
    })

    reset()
  }

  return (
    <Paper
      component="form"
      className={classNames('filters-form', { 'filters-form-mobile': mobile })}
      sx={{ boxShadow: 'none' }}
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      autoComplete="off"
    >
      <FormProvider {...methods}>
        <SortFilter/>

        <CategoryFilter/>

        <BrandFilter/>

        <PriceFilter/>
      </FormProvider>

      <div className="filters-form__toolbar">
        <StyledButton type="submit">Применить</StyledButton>
        <StyledButton onClick={handleReset}>Очистить</StyledButton>
        {mobile && <StyledButton onClick={handleClose}>Закрыть</StyledButton>}
      </div>
    </Paper>
  )
}

export default FiltersForm
