export type Product = {
  id: number
  name: string
  price: number
  count: number
}

export type GetProducts = () => Promise<any>

export type CreateProductPayload = Omit<Product, 'id'>

export type CreateProduct = (payload: CreateProductPayload) => Promise<any>

export type DeleteProduct = (id: number) => Promise<any>

export type ProductsContextProps = {
  getProducts: GetProducts
  products: Product[]
  createProduct: CreateProduct
  deleteProduct: DeleteProduct
}
