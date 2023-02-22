import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { Box, Modal } from '@mui/material'

import Svg from '../../../components/Svg'
import { Slide } from '../../../contexts/slider/types'
import EditSlideForm from './EditSlideForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  slide: Slide
}

const EditSlide: React.FC<Props> = ({ slide }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleOpen} type="button" sx={{ p: '6px' }}>
        <Svg id="pencil" width={30} height={30} />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        title="Редактировать слайд"
      >
        <Box sx={style}>
          <EditSlideForm record={slide} />
        </Box>
      </Modal>
    </>
  )
}

export default EditSlide
