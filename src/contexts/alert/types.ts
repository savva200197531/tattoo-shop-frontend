import { AlertColor } from '@mui/material/Alert/Alert'

export type ShowAlertPayload = {
  text?: string
  severity: AlertColor
}

export type ShowAlert = (payload: ShowAlertPayload) => void

export type HideAlert = () => void

export type AlertContextProps = {
  showAlert: ShowAlert
  hideAlert: HideAlert
  open: boolean
  text: string | undefined
  severity: AlertColor
}
