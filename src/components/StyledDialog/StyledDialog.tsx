import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import './styles.scss'
import { StyledButton } from '../StyledButtons'

type Props = {
  icon: React.ReactElement
  handleSubmit: () => void
  title: string
  text: string
  submitButtonTitle?: string
  closeButtonTitle?: string
}

const StyledDialog: React.FC<Props> = ({
  icon,
  handleSubmit,
  title,
  text,
  submitButtonTitle = 'Удалить',
  closeButtonTitle = 'Отмена',
}) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpen(true)
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpen(false)
  }

  return (
    <>
      {React.cloneElement(icon, {
        onClick: handleClickOpen,
      })}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" onClick={event => {
            handleSubmit()
            handleClose(event)
          }} autoFocus>
            {submitButtonTitle}
          </StyledButton>

          <StyledButton
            onClick={handleClose}
          >
            {closeButtonTitle}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StyledDialog
