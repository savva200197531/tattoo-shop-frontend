import React from 'react'
import { TextField } from '@mui/material'
import InputMask, { Props as InputMaskProps } from 'react-input-mask'
import { Controller, useFormContext } from 'react-hook-form'
import { BaseFormInputTextProps } from './types'
import { TextFieldProps } from '@mui/material/TextField/TextField'

type Props = BaseFormInputTextProps & TextFieldProps & InputMaskProps

const FormInputMasked: React.FC<Props> = ({ name, ...rest }) => {
  const { formState: { errors }, control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <InputMask
          sx={{ mb: 2 }}
          fullWidth
          error={!!errors[name]}
          helperText={<>{errors[name] ? errors[name]?.message : ''}</>}
          onChange={onChange}
          value={value}
          {...rest}
        >
          {/*// @ts-ignore*/}
          {(props) => <TextField {...props} />}
        </InputMask>
      )}
    />
  )
}

export default FormInputMasked
