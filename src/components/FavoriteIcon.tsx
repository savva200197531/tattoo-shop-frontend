import React from 'react'
import IconButton from '@mui/material/IconButton'
import Svg from './Svg'
import { Badge, BadgeProps, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 10,
    border: `2px solid #D0D2E1`,
    padding: '0 4px',
  },
}))

const FavoriteIcon = () => {
  const navigate = useNavigate()

  return (
    <IconButton onClick={() => navigate('/cart')} type="button" sx={{ p: '6px' }}>
      <StyledBadge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={4}
        color="primary"
      >
        <Svg className="base-icon" id="hearth" />
      </StyledBadge>
    </IconButton>
  )
}

export default FavoriteIcon
