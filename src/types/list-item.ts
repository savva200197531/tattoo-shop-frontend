import { CSSProperties, ReactNode } from 'react'

export type ListItem = {
  onClick?: () => void
  element: ReactNode | string
  className?: string
  customElement?: boolean
  style?: CSSProperties
  grow?: number
  to?: string
}
