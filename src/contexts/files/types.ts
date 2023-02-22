export type LocalFile = {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  is_used: boolean;
}

export const ACCEPTED_IMAGE_TYPES = ['.jpeg', '.jpg', '.png', '.webp', '.svg']

export type CreateFilesPayload = {
  files: File[]
  path: string
  key: string
}

export type CreateFiles = (payload: CreateFilesPayload) => Promise<any>

export type DeleteFile = (id: number) => Promise<any>

export type FilesContextProps = {
  deleteFile: DeleteFile
  createFiles: CreateFiles
}
