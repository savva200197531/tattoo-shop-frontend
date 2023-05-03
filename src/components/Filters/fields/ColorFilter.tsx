import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useColors } from '../../../contexts/productsFilters/ColorsContext/ColorsContext'
import { Color, GetColorsFilter } from '../../../contexts/productsFilters/ColorsContext/types'
import FormInputSelectMultiple from '../../FormInputs/Select/FormInputSelectMultiple'
import ColorBadge from '../../ColorLabel/ColorBadge'
import { BaseFilterFieldProps } from './types'

const ColorFilter: React.FC<BaseFilterFieldProps> = ({ defaultValue }) => {
  const [colors, setColors] = useState<Color[]>([])

  const { getColors } = useColors()
  const { watch } = useFormContext()

  const category_id = watch('category')

  const loadColors = (filter?: GetColorsFilter) => {
    getColors(filter)
      .then(data => {
        setColors(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    category_id ? loadColors({ category_id }) : loadColors()
  }, [category_id])

  return (
    <FormInputSelectMultiple
      style={!colors.length ? { display: 'none' } : {}}
      label="Цвет"
      name="color"
      defaultValue={defaultValue}
      optionIcon={(option: any) => <ColorBadge color={option.value} />}
      options={colors}
    />
  )
}

export default ColorFilter
