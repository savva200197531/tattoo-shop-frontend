import { Button, styled, ButtonProps } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'

export const StyledButton = styled(Button)<ButtonProps>((props) => ({
  'backgroundColor': props.theme.palette.primary.main,
  'color': 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 136, 0, 0.85)',
  },
}))

export const StyledLoadingButton = styled(LoadingButton)<LoadingButtonProps>((props) => ({
  'backgroundColor': props.theme.palette.primary.main,
  'color': 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 136, 0, 0.85)',
    // color: 'white',
    // color: 'bla',
  },
}))
