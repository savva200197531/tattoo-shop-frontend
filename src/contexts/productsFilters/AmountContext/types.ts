import { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter } from '../types'

export type Amount = BaseFilter & {
  category_ids: number[]
}

export type GetAmountsFilter = {
  category_id?: string | number | null
}

export type GetAmounts = (filter?: GetAmountsFilter) => Promise<any>

export type CreateAmountPayload = BaseFilterPayload & {
  category_ids: number[]
}

export type EditAmountPayload = Partial<CreateAmountPayload>

export type CreateAmount = (payload: CreateAmountPayload) => Promise<any>

export type EditAmount = (id: number, payload: EditAmountPayload) => Promise<any>

export type AmountsContextProps = {
  getAmounts: GetAmounts
  createAmount: CreateAmount
  editAmount: EditAmount
  deleteAmount: BaseDeleteFilter
  getAmount: BaseGetFilter
}
