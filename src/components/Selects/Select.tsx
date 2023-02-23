import React, { useRef } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'
import { BaseSelectProps } from './types'
import { useFormContext } from 'react-hook-form'

const Select: React.FC<BaseSelectProps> = ({ options, name, label }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext()

  const defaultValue = useRef(getValues(name) || '')

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        error={!!errors[name]}
        label={label}
        defaultValue={defaultValue.current}
        {...register(name, { valueAsNumber: true })}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText error>
        <>{errors[name] ? errors[name]?.message : ''}</>
      </FormHelperText>
    </FormControl>
  )
}

export default Select
