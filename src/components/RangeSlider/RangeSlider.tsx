import React from 'react'
import './styles.scss'
import { Box, Grid, Input, Slider, Typography } from '@mui/material'

function valuetext(value: number) {
  return `${value}°C`
}

type Props = {
  onChange: (value: number[]) => void
  label: string
  defaultValue: number[]
}

const minDistance = 100

const RangeSlider: React.FC<Props> = ({ onChange, label, defaultValue }) => {
  const [value, setValue] = React.useState<number[]>(defaultValue)

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], defaultValue[1] - minDistance)
        setValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue([clamped - minDistance, clamped])
      }
    } else {
      setValue(newValue as number[])
    }
  }

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([Number(event.target.value), value[1]])
  }

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([value[0], Number(event.target.value)])
  }

  const handleMinBlur = () => {
    if (value[0] < defaultValue[0]) {
      setValue([defaultValue[0], value[1]])
    }
  }

  const handleMaxBlur = () => {
    if (value[1] > defaultValue[1]) {
      setValue([value[0], defaultValue[1]])
    }
  }

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            value={value[0]}
            size="small"
            onChange={handleMinInputChange}
            onBlur={handleMinBlur}
            inputProps={{
              'step': 10,
              'min': defaultValue[0],
              'max': defaultValue[1],
              'type': 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            // getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            onChangeCommitted={() => onChange(value)}
            min={defaultValue[0]}
            max={defaultValue[1]}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
          />
        </Grid>
        <Grid item>
          <Input
            value={value[1]}
            size="small"
            onChange={handleMaxInputChange}
            onBlur={handleMaxBlur}
            inputProps={{
              'step': 10,
              'min': defaultValue[0],
              'max': defaultValue[1],
              'type': 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RangeSlider
