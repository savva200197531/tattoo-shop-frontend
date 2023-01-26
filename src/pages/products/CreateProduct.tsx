import React, { useState } from 'react'
import { SpeedDial, SpeedDialIcon } from '@mui/lab'
import { Box, Modal } from '@mui/material'
import CreateProductForm from './CreateProductForm'

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
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        title="Добавить товар"
      >
        <Box sx={style}>
          <CreateProductForm />
        </Box>
      </Modal>
    </>
  )
}

export default CreateProduct
