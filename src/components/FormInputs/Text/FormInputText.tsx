import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'
import { BaseFormInputTextProps } from './types'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

type Props = BaseFormInputTextProps & TextFieldProps

const FormInputText: React.FC<Props> = ({ name, ...rest }) => {
  const { formState: { errors }, control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          onChange={onChange}
          value={value || ''}
          error={!!errors[name]}
          helperText={<>{errors[name] ? errors[name]?.message : ''}</>}
          {...rest}
        />
      )}
    />
  )
}

export default FormInputText
