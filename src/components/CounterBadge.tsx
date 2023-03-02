import React, { ReactElement } from 'react'

import IconButton from '@mui/material/IconButton'
import { Badge, BadgeProps, styled } from '@mui/material'

const StyledBadge = styled(Badge)<BadgeProps>((props) => {
  console.log(props)
  return ({
    '& .MuiBadge-badge': {
      right: props?.style?.right,
      top: 6,
      border: `2px solid ${props.theme.palette.background.paper}`,
      padding: '0 4px',
    },
  })
})

type Props = BadgeProps & {
  count: number
  children: ReactElement
  onClick: () => void
  right?: number
}

const CounterBadge: React.FC<Props> = ({ count, children, onClick, right = -1 }) => {
  return (
    <IconButton onClick={onClick} type="button" sx={{ p: '6px' }}>
      <StyledBadge
        style={{
          right,
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
    </IconButton>
  )
}

export default CounterBadge
