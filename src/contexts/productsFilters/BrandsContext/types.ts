import { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter } from '../types'

export type Brand = BaseFilter & {
  category_ids: number[]
}

export type GetBrandsFilter = {
  category_id?: string | number | null
}

export type GetBrands = (filter?: GetBrandsFilter) => Promise<any>

export type CreateBrandPayload = BaseFilterPayload & {
  category_ids: number[]
}

export type EditBrandPayload = Partial<CreateBrandPayload>

export type CreateBrand = (payload: CreateBrandPayload) => Promise<any>

export type EditBrand = (id: number, payload: EditBrandPayload) => Promise<any>

export type BrandsContextProps = {
  getBrands: GetBrands
  createBrand: CreateBrand
  editBrand: EditBrand
  deleteBrand: BaseDeleteFilter
  getBrand: BaseGetFilter
}
