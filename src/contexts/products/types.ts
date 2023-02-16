export type Product = {
  id: number
  name: string
  price: number
  count: number
  img_ids: number[] | null
}

export type GetProducts = () => Promise<any>

export type GetProduct = (id: number) => Promise<any>

export type CreateProductPayload = {
  name: string
  price: number
  count: number
  images?: File[]
}

export type CreateProduct = (payload: CreateProductPayload) => Promise<any>

export type DeleteProduct = (id: number) => Promise<any>

export type ProductsContextProps = {
  getProducts: GetProducts
  getProduct: GetProduct
  products: Product[]
  createProduct: CreateProduct
  deleteProduct: DeleteProduct
}
