import { ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import { Option } from './types'
import Checkbox from '@mui/material/Checkbox'

export const generateSelectOptions = (options: Option[]) => {
  return options.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    )
  })
}

export const generateSelectMultipleOptions = (options: Option[], value: number[]) => {
  return options.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        <Checkbox checked={value.indexOf(option.id) > -1}/>
        <ListItemText primary={option.name}/>
      </MenuItem>
    )
  })
}
