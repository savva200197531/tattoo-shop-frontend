import React, { useEffect } from 'react'

import { useFormContext, Controller } from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, OutlinedInput, Select } from '@mui/material'
import { BaseFormInputSelectProps } from './types'
import { generateSelectMultipleOptions } from './GenerateSelectOptions'

const FormInputSelectMultiple: React.FC<BaseFormInputSelectProps> = ({
  name,
  label,
  options,
  optionIcon,
  defaultValue,
  style,
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
      defaultValue={defaultValue || []}
      render={({ field: { onChange, value } }) => (
        <FormControl style={style} fullWidth sx={{ mb: 2 }}>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={onChange}
            value={value || []}
            error={!!errors[name]}
            label={label}
            input={<OutlinedInput label={label} />}
            multiple
            renderValue={(selected) => {
              return options
                .filter(option => selected.some((item: number) => item === option.id))
                .map(category => category.name)
                .join(', ')
            }}
          >
            {generateSelectMultipleOptions(options, value, optionIcon)}
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
