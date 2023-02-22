import React, { ReactNode, useContext } from 'react'
import axios from 'axios'

import { requestUrl } from '../../env'
import { DeleteFile, FilesContextProps } from './types'

const FilesContext = React.createContext<FilesContextProps>({} as FilesContextProps)

export const useFiles = () => useContext(FilesContext)

type Props = {
  children: ReactNode
}

export const FilesProvider: React.FC<Props> = ({ children }) => {
  const deleteFile: DeleteFile = (id) => axios.delete(`${requestUrl}/files/${id}`)

  const value = {
    deleteFile,
  }

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}
