// BASE

export type BaseFilter = {
  id: number
  name: string
}

export type BaseFilterPayload = {
  name: string
}

export type BaseGetFilters = () => Promise<any>

export type BaseDeleteFilter = (id: number) => Promise<any>

// CATEGORIES

export type Category = BaseFilter & {
  img_id: number
}

export type CreateCategoryPayload = BaseFilterPayload & {
  img_id: number
}

export type EditCategoryPayload = Partial<CreateCategoryPayload>

export type CreateCategory = (payload: CreateCategoryPayload) => Promise<any>

export type EditCategory = (id: number, payload: EditCategoryPayload) => Promise<any>

// BRANDS

export type Brand = BaseFilter & {
  category_ids: number[]
}

export type CreateBrandPayload = BaseFilterPayload & {
  category_ids: number[]
}

export type EditBrandPayload = Partial<CreateBrandPayload>

export type CreateBrand = (payload: CreateBrandPayload) => Promise<any>

export type EditBrand = (id: number, payload: EditBrandPayload) => Promise<any>

// OUTPUT

export type ProductsFiltersContextProps = {
  // CATEGORIES
  getCategories: BaseGetFilters
  createCategory: CreateCategory
  editCategory: EditCategory
  deleteCategory: BaseDeleteFilter
  categories: Category[]

  // BRANDS
  getBrands: BaseGetFilters
  createBrand: CreateBrand
  editBrand: EditBrand
  deleteBrand: BaseDeleteFilter
  brands: Brand[]
}
