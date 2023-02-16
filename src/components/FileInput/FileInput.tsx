import React, { useEffect, useState } from 'react'
import { DropzoneArea, DropzoneAreaProps } from 'react-mui-dropzone'

import { Button } from '@mui/material'

import './styles.scss'

const Icon: React.FC = () => {
  return <Button fullWidth variant="outlined" color="primary">Прикрепить изображение</Button>
}

type Props = DropzoneAreaProps

const FileInput: React.FC<Props> = ({ onChange, ...rest }) => {
  const [files, setFiles] = useState<any[]>([])

  const handleChange = (files: any) => {
    setFiles(files)
  }

  useEffect(() => {
    onChange?.(files)
  }, [files])

  return (
    <DropzoneArea
      classes={{
        root: 'file-input',
      }}
      Icon={Icon}
      dropzoneText=""
      onChange={handleChange}
      {...rest}
    />
  )
}

export default FileInput
