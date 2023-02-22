export type LocalFile = {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  is_used: boolean;
}

export type DeleteFile = (id: number) => Promise<any>

export type FilesContextProps = {
  deleteFile: DeleteFile
}
