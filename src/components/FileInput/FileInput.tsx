import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'react-mui-dropzone'

import { Button } from '@mui/material'

import './styles.scss'

const Icon: React.FC = () => {
  return <Button fullWidth variant="outlined" color="primary">Прикрепить изображение</Button>
}

type Props = {
  onChange: (value: any) => void
}

const FileInput: React.FC<Props> = ({ onChange }) => {
  const [files, setFiles] = useState<any[]>([])

  const handleChange = (files: any) => {
    setFiles(files)
  }

  useEffect(() => {
    onChange(files)
  }, [files])

  return (
    <DropzoneArea
      classes={{
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
