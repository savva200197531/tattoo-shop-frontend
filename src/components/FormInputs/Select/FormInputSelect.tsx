import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material'
import { BaseFormInputSelectProps } from './types'
import { generateSelectOptions } from './GenerateSelectOptions'

const FormInputSelect: React.FC<BaseFormInputSelectProps> = ({ name, label, options }) => {
  const { formState: { errors }, control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={onChange}
            value={value || ''}
            error={!!errors[name]}
            label={label}
          >
            {generateSelectOptions(options)}
          </Select>
          <FormHelperText error>
            <>{errors[name] ? errors[name]?.message : ''}</>
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default FormInputSelect
