import React from 'react'

type Props = {
  children?: React.ReactNode;
  index: number | string
  value: number | string
  className?: string;
}

export type TabProps = {
  label: string;
  to: string
}

const TabPanel: React.FC<Props> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default TabPanel
