import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import FormInputSelectMultiple from '../../FormInputs/Select/FormInputSelectMultiple'
import { BaseFilterFieldProps } from './types'
import { useAmount } from '../../../contexts/productsFilters/AmountContext/AmountContext'
import { Amount, GetAmountsFilter } from '../../../contexts/productsFilters/AmountContext/types'

const AmountFilter: React.FC<BaseFilterFieldProps> = ({ defaultValue }) => {
  const [amounts, setAmounts] = useState<Amount[]>([])

  const { getAmounts } = useAmount()
  const { watch } = useFormContext()

  const category_id = watch('category')

  const loadAmounts = (filter?: GetAmountsFilter) => {
    getAmounts(filter)
      .then(data => {
        setAmounts(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    category_id ? loadAmounts({ category_id }) : loadAmounts()
  }, [category_id])

  if (!amounts.length) {
    return null
  }

  return (
    <FormInputSelectMultiple
      label="Обьем"
      name="amount"
      defaultValue={defaultValue}
      options={amounts}
    />
  )
}

export default AmountFilter
