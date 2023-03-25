import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Svg from '../Svg/Svg'
import { imgSrc } from '../../helpers/imgSrc'

type Props = {
  onDelete: (id: number) => void
  id: number
}

const FileInputItem: React.FC<Props> = ({ onDelete, id }) => {
  const [hovered, setHovered] = useState<boolean>(false)

  const handleMouseOver = () => {
    setHovered(true)
  }

  const handleMouseOut = () => {
    setHovered(false)
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="file-input__img-wrapper">
      {hovered && (
        <IconButton onClick={() => onDelete(id)} className="file-input__delete-icon" type="button" sx={{ p: '6px' }}>
          <Svg id="trash" width={30} height={30}/>
        </IconButton>
      )}
      <img
        src={imgSrc(id)}
        alt="file"
        style={{ width: '100px', height: '100px' }}
        className="file-input__img"
      />
    </div>
  )
}

export default FileInputItem
