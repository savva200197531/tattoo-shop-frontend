// const capitalizeString = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const validationErrors = {
  required: (name: string) => `Поле ${name} обязательно для заполнения`,
  min: (name: string, length: number) => `Поле ${name} должно быть не менее ${length} символов`,
  max: (name: string, length: number) => `Поле ${name} должно быть не более ${length} символов`,
  acceptedFiles: (types: string[]) => `Допустимы только изображения формата ${types.join(', ')}`,
  email: () => `Почта введена не верно`,
}
