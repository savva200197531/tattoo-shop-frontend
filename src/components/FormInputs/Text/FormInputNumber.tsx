import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'
import { BaseFormInputTextProps } from './types'
import { TextField } from '@mui/material'

const FormInputNumber: React.FC<BaseFormInputTextProps> = ({ name, label }) => {
  const { formState: { errors }, control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          {...register(name, { valueAsNumber: true })}
          sx={{ mb: 2 }}
          fullWidth
          onChange={onChange}
          value={value || ''}
          label={label}
          type="number"
          inputProps={{ inputMode: 'numeric' }}
          error={!!errors[name]}
          helperText={<>{errors[name] ? errors[name]?.message : ''}</>}
        />
      )}
    />
  )
}

export default FormInputNumber
