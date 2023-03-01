import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material'
import { BaseFormInputSelectProps } from './types'
import { generateSelectMultipleOptions } from './GenerateSelectOptions'

const FormInputSelectMultiple: React.FC<BaseFormInputSelectProps> = ({ name, label, options }) => {
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
            value={value || []}
            error={!!errors[name]}
            label={label}
            multiple
            renderValue={(selected) => {
              return options
                .filter(option => selected.some((item: number) => item === option.id))
                .map(category => category.name)
                .join(', ')
            }}
          >
            {generateSelectMultipleOptions(options, value)}
          </Select>

          <FormHelperText error>
            <>{errors[name] ? errors[name]?.message : ''}</>
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default FormInputSelectMultiple
