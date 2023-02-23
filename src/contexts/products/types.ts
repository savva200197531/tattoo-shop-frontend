export type Product = {
  id: number
  name: string
  price: number
  count: number
  brand_id: number
  category_id: number
  img_ids: number[] | null
}

export type GetProducts = () => Promise<any>

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

export type ProductsContextProps = {
  getProducts: GetProducts
  getProduct: GetProduct
  products: Product[]
  createProduct: CreateProduct
  editProduct: EditProduct
  deleteProduct: DeleteProduct
}
