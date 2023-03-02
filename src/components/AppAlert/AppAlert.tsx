import React from 'react'

import { Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useAlert } from '../../contexts/alert/AlertContext'
import './styles.scss'

const AppAlert = () => {
  const { open, hideAlert, severity, text } = useAlert()

  return (
    <div className="app-alert">
      <Collapse in={open}>
        <Alert
          severity={severity}
          variant="outlined"
          style={{
            backgroundColor: 'white',
          }}
          action={
            <IconButton
              aria-label="close"
              color="default"
              size="small"
              onClick={() => {
                hideAlert()
              }}
            >
              <CloseIcon color="primary" fontSize="inherit"/>
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </div>
  )
}

export default AppAlert
