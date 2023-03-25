export const formatArrayFromUrl = (value: string | null): number[] | undefined => {
  if (value) {
    return value.split(',').map(item => +item)
  }
}
