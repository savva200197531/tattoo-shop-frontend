export type GetProductsResponse = {
  data: Product[]
  links: ProductsLinks
  meta: ProductsMeta
}

export type Product = {
  id: number
  name: string
  price: number
  count: number
  brand_id: number
  category_id: number
  img_ids: number[] | null
  created_at: string
}

export type ProductsMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: any;
  searchBy: any;
  search: string;
  filter?: ProductsFilter;
}

export type ProductsLinks = {
  first?: string;
  previous?: string;
  current: string;
  next?: string;
  last?: string;
}

export type ProductsParams = {
  limit?: string | null
  page?: string | null
  sortBy?: string | null
  route?: string
}

export type ProductsFilter = {
  category_id?: string | null
  brand_id?: string | null
  price_min?: string | null
  price_max?: string | null
}

export type GetProducts = (params?: ProductsParams, filter?: ProductsFilter) => Promise<any>

export type GetProduct = (id: number) => Promise<any>

export type CreateProductPayload = {
  name: string
  price: number
  count: number
  category_id: number
  img_ids?: number[]
}

export type CreateProduct = (payload: CreateProductPayload) => Promise<any>

export type EditProductPayload = Partial<CreateProductPayload> & {}

export type EditProduct = (id: number, payload: EditProductPayload) => Promise<any>

export type DeleteProduct = (id: number) => Promise<any>

export type GetPriceRange = (category_id: string | null) => Promise<any>

export type PriceRange = { min: number, max: number }

export type ProductsContextProps = {
  getProducts: GetProducts
  getProduct: GetProduct
  products: Product[]
  productsLinks: ProductsLinks
  productsMeta: ProductsMeta
  createProduct: CreateProduct
  editProduct: EditProduct
  deleteProduct: DeleteProduct
  getPriceRange: GetPriceRange
  priceRange: PriceRange
}
