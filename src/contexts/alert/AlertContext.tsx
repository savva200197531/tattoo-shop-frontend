import React, { ReactNode, useContext, useState } from 'react'

import { AlertColor } from '@mui/material/Alert/Alert'

import { AlertContextProps, HideAlert, ShowAlert } from './types'

const AlertContext = React.createContext<AlertContextProps>({} as AlertContextProps)

export const useAlert = () => useContext(AlertContext)

type Props = {
  children: ReactNode
}

export const AlertProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string | undefined>(undefined)
  const [severity, setSeverity] = useState<AlertColor>('info')

  const showAlert: ShowAlert = ({ text, severity }) => {
    setOpen(true)
    setText(text)
    setSeverity(severity)
  }

  const hideAlert: HideAlert = () => {
    setOpen(false)
  }

  const value = {
    open,
    showAlert,
    hideAlert,
    text,
    severity,
  }

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}
