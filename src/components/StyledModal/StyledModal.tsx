import React, { useState } from 'react'
import classNames from 'classnames'

import { Box, Modal } from '@mui/material'

import './styles.scss'
import Svg from '../Svg/Svg'
import IconButton from '@mui/material/IconButton'
import { HandleClickEmpty, HandleClickOnElement } from '../../types/types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  title: string
  children: (handleClose: HandleClickOnElement) => React.ReactElement
  className?: string
  icon: React.ReactElement
}

const StyledModal: React.FC<Props> = ({ title, children, className, icon }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen: HandleClickOnElement = (event) => {
    event?.stopPropagation()
    setOpen(true)
  }

  const handleClose: HandleClickEmpty = () => {
    setOpen(false)
  }

  return (
    <>
      {React.cloneElement(icon, {
        onClick: handleOpen,
      })}

      <Modal
        className={classNames('styled-modal', className)}
        open={open}
        onClose={handleClose}
        title={title}
      >
        <Box className="styled-modal-content" sx={style}>
          <IconButton
            className="styled-modal-close"
            onClick={handleClose}
            type="button"
            color="secondary"
            sx={{ p: '6px', position: 'absolute' }}
          >
            <Svg id="cross"/>
          </IconButton>
          {children(handleClose)}
        </Box>
      </Modal>
    </>
  )
}

export default StyledModal
