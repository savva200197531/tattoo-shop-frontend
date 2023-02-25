import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material'
import { BaseSelectProps, OptionId } from './types'

type Props = BaseSelectProps & {
  onChange: (value: OptionId) => void
  defaultValue?: OptionId
}

const Select: React.FC<Props> = ({ options, label, defaultValue = 0, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<OptionId>(defaultValue)

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event

    setSelectedValue(value)
  }

  useEffect(() => {
    onChange(selectedValue)
  }, [selectedValue])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={selectedValue as any}
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
