import { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter } from '../types'

export type Color = BaseFilter & {
  category_ids: number[]
  value: string
}

export type GetColorsFilter = {
  category_id?: string | number | null
}

export type GetColors = (filter?: GetColorsFilter) => Promise<any>

export type CreateColorPayload = BaseFilterPayload & {
  category_ids: number[]
  value: string
}

export type EditColorPayload = Partial<CreateColorPayload>

export type CreateColor = (payload: CreateColorPayload) => Promise<any>

export type EditColor = (id: number, payload: EditColorPayload) => Promise<any>

export type ColorsContextProps = {
  getColors: GetColors
  createColor: CreateColor
  editColor: EditColor
  deleteColor: BaseDeleteFilter
  getColor: BaseGetFilter
}
