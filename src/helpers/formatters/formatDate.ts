import { DateTime } from 'luxon'

export const formatDate = (isoDate: string): string => {
  return DateTime.fromISO(isoDate).toLocal().toLocaleString(DateTime.DATETIME_MED)
}
