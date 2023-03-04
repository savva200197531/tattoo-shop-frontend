import React from 'react'
import { ListItem } from '../../types/list-item'
import IconButton from '@mui/material/IconButton'
import Svg from '../Svg/Svg'
import { Box } from '@mui/material'

const items: ListItem[] = [
  {
    element: (
      <a href="tel:89635207570">
        <IconButton type="button" color="secondary" sx={{ p: '6px' }}>
          <Svg className="base-icon" id="phone"/>
        </IconButton>
      </a>
    ),
    customElement: true,
  },
  {
    element: 'vk',
    to: 'https://vk.com/club219176295',
  },
  {
    element: 'instagram',
    to: 'https://instagram.com/tattoonamatata.shop?igshid=YmMyMTA2M2Y=',
  },
  {
    element: 'telegram',
    to: 'https://t.me/tattoona_matata',
  },
]

const ContactsList: React.FC = () => {
  const onClick = (to?: string) => {
    if (!to) return
    window.open(to, '_blank')
  }

  return (
    <>
      {items.map(({ element, to, customElement }, index) => (
        <Box className="header-item" key={index} sx={{ flexGrow: 0 }}>
          {customElement ? element : (
            <IconButton key={index} onClick={() => onClick(to)} type="button" color="secondary" sx={{ p: '6px' }}>
              <Svg className="base-icon" id={element as string}/>
            </IconButton>
          )}
        </Box>
      ))}
    </>
  )
}

export default ContactsList
