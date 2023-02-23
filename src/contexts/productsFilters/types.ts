export type BaseFilter = {
  id: number
  name: string
}

export type BaseFilterPayload = {
  name: string
}

export type BaseGetFilters = () => Promise<any>

export type BaseDeleteFilter = (id: number) => Promise<any>

export type Category = BaseFilter & {}

export type CreateCategory = (payload: BaseFilterPayload) => Promise<any>

export type EditCategory = (id: number, payload: BaseFilterPayload) => Promise<any>

export type ProductsFiltersContextProps = {
  getCategories: BaseGetFilters
  createCategory: CreateCategory
  editCategory: EditCategory
  deleteCategory: BaseDeleteFilter
  categories: Category[]
}
