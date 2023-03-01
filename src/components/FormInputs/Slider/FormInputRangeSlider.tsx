import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Box, Grid, Input, Slider, Typography } from '@mui/material'

function valuetext(value: number) {
  return `${value}°C`
}

const minDistance = 1000

const step = 10

type Props = {
  name: string
  label: string
  min: number
  max: number
  defaultValue: number[]
}

export const FormInputRangeSlider: React.FC<Props> = ({
  label,
  min,
  max,
  name,
  defaultValue,
}) => {
  const { control, setValue } = useFormContext()

  const [sliderValue, setSliderValue] = useState<number[]>([defaultValue[0], defaultValue[1]])

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
        const clamped = Math.min(newValue[0], max - minDistance)
        setSliderValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setSliderValue([clamped - minDistance, clamped])
      }
    } else {
      setSliderValue(newValue as number[])
    }
  }

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue([Number(event.target.value), sliderValue[1]])
  }

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue([sliderValue[0], Number(event.target.value)])
  }

  const handleMinBlur = () => {
    if (sliderValue[0] < min) {
      setSliderValue([min, sliderValue[1]])
    }
    setValue(name, sliderValue)
  }

  const handleMaxBlur = () => {
    if (sliderValue[1] > max) {
      setSliderValue([sliderValue[0], max])
    }
    setValue(name, sliderValue)
  }

  const handleChangeCommitted = () => {
    setValue(name, sliderValue)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Box sx={{ mb: 2 }}>
          <Typography id="input-slider" gutterBottom>
            {label}
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Input
                value={sliderValue[0]}
                size="small"
                onChange={handleMinInputChange}
                onBlur={handleMinBlur}
                inputProps={{
                  'step': step,
                  'min': min,
                  'max': max,
                  'type': 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
            <Grid item xs>
              <Slider
                value={sliderValue}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                min={min}
                max={max}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Grid>
            <Grid item>
              <Input
                value={sliderValue[1]}
                size="small"
                onChange={handleMaxInputChange}
                onBlur={handleMaxBlur}
                inputProps={{
                  'step': step,
                  'min': min,
                  'max': max,
                  'type': 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    />
  )
}
