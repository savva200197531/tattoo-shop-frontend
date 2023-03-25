import React, { useEffect } from 'react'

import { useFormContext, Controller } from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material'
import { BaseFormInputSelectProps } from './types'
import { generateSelectOptions } from './GenerateSelectOptions'

const FormInputSelect: React.FC<BaseFormInputSelectProps> = ({
  name,
  label,
  options,
  defaultValue,
  optionIcon,
}) => {
  const { formState: { errors }, control, resetField } = useFormContext()

  useEffect(() => {
    return () => {
      resetField(name)
    }
  }, [])

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={onChange}
            value={value || ''}
            error={!!errors[name]}
            label={label}
            renderValue={(selected) => options.find(item => item.id === selected)?.name}
          >
            {generateSelectOptions(options, optionIcon)}
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
