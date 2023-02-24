import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { BaseSelectProps } from './types'

type Props = BaseSelectProps & {
  onChange: (value: number[]) => void
  defaultValue?: number[]
}

const MultiSelect: React.FC<Props> = ({ options, label, onChange, defaultValue = [] }) => {
  const [selectedValues, setSelectedValues] = useState<number[]>(defaultValue)

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event

    setSelectedValues(value as number[])
  }

  useEffect(() => {
    onChange(selectedValues)
  }, [selectedValues])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        multiple
        onChange={handleChange}
        value={selectedValues}
        renderValue={(selected) => {
          return options
            .filter(option => selected.some((item: number) => item === option.id))
            .map(category => category.name)
            .join(', ')
        }}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedValues.indexOf(option.id) > -1}/>
            <ListItemText primary={option.name}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelect
