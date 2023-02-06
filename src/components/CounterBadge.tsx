import React, { ReactElement } from 'react'

import IconButton from '@mui/material/IconButton'
import { Badge, BadgeProps, styled } from '@mui/material'

const StyledBadge = styled(Badge)<BadgeProps>((props) => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 6,
    border: `2px solid ${props.theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

type Props = {
  count: number
  children: ReactElement
  onClick: () => void
}

const CounterBadge: React.FC<Props> = ({ count, children, onClick }) => {
  return (
    <IconButton onClick={onClick} type="button" sx={{ p: '6px' }}>
      <StyledBadge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        badgeContent={count}
        color="primary"
      >
        {children}
      </StyledBadge>
    </IconButton>
  )
}

export default CounterBadge
