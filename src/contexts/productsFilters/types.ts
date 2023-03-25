export type BaseFilter = {
  id: number
  name: string
}

export type BaseFilterPayload = {
  name: string
}

export type BaseGetFilters = () => Promise<any>

export type BaseGetFilter = (id: number) => Promise<any>

export type BaseDeleteFilter = (id: number) => Promise<any>
