import React, { useRef } from 'react'
import { FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useFormContext } from 'react-hook-form'

export type Option = {
  name: string
  id: number
}

type Props = {
  options: Option[]
  name: string
}

const MultiSelect: React.FC<Props> = ({ options, name }) => {
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext()

  const defaultValues = useRef(getValues(name))

  const selectedValues = watch(name)

  return (
    <FormControl fullWidth>
      <InputLabel>Категория товара</InputLabel>
      <Select
        error={!!errors['category_ids']}
        label="Категория товара"
        multiple
        defaultValue={defaultValues.current}
        renderValue={(selected) => {
          return options
            .filter(option => selected.some((item: number) => item === option.id))
            .map(category => category.name)
            .join(', ')
        }}
        {...register(name)}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedValues.indexOf(option.id) > -1}/>
            <ListItemText primary={option.name}/>
          </MenuItem>
        ))}
      </Select>

      <FormHelperText error>
        <>{errors[name] ? errors[name]?.message : ''}</>
      </FormHelperText>
    </FormControl>
  )
}

export default MultiSelect
