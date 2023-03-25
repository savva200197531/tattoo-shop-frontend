import { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter, BaseGetFilters } from '../types'

export type Category = BaseFilter & {
  img_id: number
}

export type CreateCategoryPayload = BaseFilterPayload & {
  img_id: number
}

export type EditCategoryPayload = Partial<CreateCategoryPayload>

export type CreateCategory = (payload: CreateCategoryPayload) => Promise<any>

export type EditCategory = (id: number, payload: EditCategoryPayload) => Promise<any>

export type CategoriesContextProps = {
  getCategories: BaseGetFilters
  createCategory: CreateCategory
  editCategory: EditCategory
  deleteCategory: BaseDeleteFilter
  getCategory: BaseGetFilter
}
