import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'react-mui-dropzone'

import { Button } from '@mui/material'

import './styles.scss'

const Icon: React.FC = () => {
  return <Button variant="outlined" color="primary">Прикрепить изображение</Button>
}

const FileInput = () => {
  const [files, setFiles] = useState<any[]>()

  const handleChange = (files: any) => {
    setFiles(files)
  }

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <DropzoneArea
      classes={{
        icon: '123',
        root: 'file-input',
      }}
      filesLimit={9}
      Icon={Icon}
      dropzoneText=""
      onChange={handleChange}
    />
  )
}

export default FileInput
