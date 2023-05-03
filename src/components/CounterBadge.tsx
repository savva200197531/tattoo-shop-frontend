import React, { ReactElement } from 'react'

import { Badge, BadgeProps, Button, styled } from '@mui/material'

const StyledBadge = styled(Badge)<BadgeProps>((props) => {
  return ({
    '& .MuiBadge-badge': {
      right: props?.style?.right,
      top: 14,
      border: `2px solid ${props.theme.palette.background.paper}`,
      padding: '0 4px',
      color: 'white',
    },
  })
})

type Props = BadgeProps & {
  count: number
  children: ReactElement
  onClick: () => void
  right?: number
}

const CounterBadge: React.FC<Props> = ({ count, children, onClick, right = 11 }) => {
  return (
    <Button onClick={onClick} type="button" color="secondary" sx={{ p: '6px' }}>
      <StyledBadge
        style={{
          right,
          display: 'contents',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        badgeContent={count}
        color="primary"
      >
        {children}
      </StyledBadge>
    </Button>
  )
}

export default CounterBadge
