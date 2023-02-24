import React, { useRef } from 'react'
import { FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useFormContext } from 'react-hook-form'
import { BaseSelectInputProps } from './types'

const MultiSelectInput: React.FC<BaseSelectInputProps> = ({ options, name, label }) => {
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext()

  const defaultValues = useRef(getValues(name))

  const selectedValues = watch(name)

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        error={!!errors[name]}
        label={label}
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

export default MultiSelectInput
