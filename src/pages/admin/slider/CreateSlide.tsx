import React, { useState } from 'react'

import { Box, Fab, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import CreateSlideForm from './CreateSlideForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const CreateProduct: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Modal
        className="product-modal"
        open={open}
        onClose={handleClose}
        title="Создать слайд"
      >
        <Box sx={style}>
          <CreateSlideForm />
        </Box>
      </Modal>
    </>
  )
}

export default CreateProduct
