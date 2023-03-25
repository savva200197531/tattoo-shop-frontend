import React, { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames'

import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

import { StyledButton } from '../StyledButtons'
import CategoryFilter from './fields/CategoryFilter'
import SortFilter from './fields/SortFilter'
import BrandFilter from './fields/BrandFilter'
import PriceFilter from './fields/PriceFilter'
import { Product } from '../../contexts/products/types'
import ColorFilter from './fields/ColorFilter'
import { formatArrayFromUrl } from '../../helpers/formatters/formatArrayFromUrl'
import AmountFilter from './fields/AmountFilter'

export type FiltersInput = {
  category: number
  brand: number
  sort: number
  price: number[]
  color: number[]
}

type Props = {
  mobile?: boolean
  handleClose?: () => void
  products: Product[]
}

const FiltersForm: React.FC<Props> = ({ mobile = false, handleClose }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [key, setKey] = useState<number>(0)

  const methods = useForm<FiltersInput>({
    defaultValues: {
      price: [],
    },
  })

  const { reset, handleSubmit, getValues, watch } = methods

  const onSubmitHandler: SubmitHandler<FiltersInput> = (data) => {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FiltersInput] as any

      if (
        typeof value === 'string' && value ||
        typeof value === 'number' && value ||
        Array.isArray(value) && value.length
      ) {
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

    setKey(key + 1)

    reset()
  }

  useEffect(() => {
    // @ts-ignore
    const subscription = watch(handleSubmit(onSubmitHandler))
    // @ts-ignore
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  return (
    <Paper
      component="form"
      className={classNames('filters-form', { 'filters-form-mobile': mobile })}
      sx={{ boxShadow: 'none' }}
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      autoComplete="off"
    >
      <div className="filters-form__header">
        <Typography variant="h4" component="h3" fontWeight={500}>
          Фильтры
        </Typography>
        <p className="filters-form__reset" onClick={handleReset}>Очистить</p>
      </div>

      <FormProvider key={key} {...methods}>
        <SortFilter defaultValue={Number(searchParams.get('sort'))} />

        <CategoryFilter defaultValue={Number(searchParams.get('category'))}/>

        <BrandFilter defaultValue={Number(searchParams.get('brand'))}/>

        <ColorFilter defaultValue={formatArrayFromUrl(searchParams.get('color'))}/>

        <AmountFilter defaultValue={formatArrayFromUrl(searchParams.get('amount'))}/>

        <PriceFilter/>
      </FormProvider>

      {mobile && <StyledButton fullWidth onClick={handleClose}>Показать</StyledButton>}
    </Paper>
  )
}

export default FiltersForm
