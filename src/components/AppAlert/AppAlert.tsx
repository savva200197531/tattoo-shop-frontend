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
            // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
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
              <CloseIcon color="secondary" fontSize="inherit"/>
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
