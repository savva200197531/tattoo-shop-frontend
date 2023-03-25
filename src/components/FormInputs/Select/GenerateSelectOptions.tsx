import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import { Option, OptionIcon } from './types'
import Checkbox from '@mui/material/Checkbox'

export const generateSelectOptions = (options: Option[], optionIcon?: OptionIcon) => {
  return options.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        {optionIcon && <ListItemIcon>{optionIcon(option)}</ListItemIcon>}
        <ListItemText primary={option.name}/>
      </MenuItem>
    )
  })
}

export const generateSelectMultipleOptions = (options: Option[], value: number[], optionIcon?: OptionIcon) => {
  return options.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        <Checkbox checked={value.indexOf(option.id) > -1}/>
        {optionIcon && <ListItemIcon>{optionIcon(option)}</ListItemIcon>}
        <ListItemText primary={option.name}/>
      </MenuItem>
    )
  })
}
