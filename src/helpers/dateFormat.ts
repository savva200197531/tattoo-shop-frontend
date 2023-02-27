import { DateTime } from 'luxon'

export const dateFormat = (isoDate: string): string => {
  return DateTime.fromISO(isoDate).toLocal().toLocaleString(DateTime.DATETIME_MED)
}
