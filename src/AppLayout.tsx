import React from 'react'

import { Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Header from './layout/header/Header'
import { useAlert } from './contexts/alert/AlertContext'
import AppRoutes from './AppRoutes'
import Footer from './layout/footer/Footer'

const AppLayout = () => {
  const { open, hideAlert, severity, text } = useAlert()

  return (
    <>
      <Header />

      {/*<div className="container">*/}
      {/*  <Collapse in={open}>*/}
      {/*    <Alert*/}
      {/*      severity={severity}*/}
      {/*      variant="outlined"*/}
      {/*      style={{*/}
      {/*        backgroundColor: 'white',*/}
      {/*      }}*/}
      {/*      action={*/}
      {/*        <IconButton*/}
      {/*          aria-label="close"*/}
      {/*          color="default"*/}
      {/*          size="small"*/}
      {/*          onClick={() => {*/}
      {/*            hideAlert()*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <CloseIcon color="primary" fontSize="inherit" />*/}
      {/*        </IconButton>*/}
      {/*      }*/}
      {/*      sx={{ mb: 2 }}*/}
      {/*    >*/}
      {/*      {text}*/}
      {/*    </Alert>*/}
      {/*  </Collapse>*/}
      {/*</div>*/}

      <AppRoutes />
      <Footer />
    </>
  )
}

export default AppLayout
