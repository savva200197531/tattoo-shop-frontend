import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material'
import { BaseSelectProps } from './types'

type Props = BaseSelectProps & {
  onChange: (value: number) => void
  defaultValue?: number
}

const Select: React.FC<Props> = ({ options, label, defaultValue = 0, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue)

  const handleChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event

    setSelectedValue(value as number)
  }

  useEffect(() => {
    onChange(selectedValue)
  }, [selectedValue])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={selectedValue}
        onChange={handleChange}
      >
        <MenuItem value={0}>
          <em>Не выбрано</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
