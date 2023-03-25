import React from 'react'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  label: string
  name: string
}

const FormInputCheckbox: React.FC<Props> = ({ label, name }) => {
  const { formState: { errors }, control } = useFormContext()

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        console.log(value)
        return (
          <FormControl error={!!errors.item_ids?.message}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event, checked) => onChange(checked)}
                  value={value}
                  checked={value}
                />
              }
              label={label}
            />
          </FormControl>
        )
      }}
      control={control}
    />
  )
}

export default FormInputCheckbox
