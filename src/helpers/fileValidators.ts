export const required = (files: File[]): boolean => !!files

export const acceptedTypes = (files: File[], types: string[]) => {
  if (!files) {
    return true
  }

  return files.some(file => types.includes(`.${file.type.split('/')[1]}`))
}
