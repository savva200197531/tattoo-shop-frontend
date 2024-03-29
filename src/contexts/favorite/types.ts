import { User } from '../auth/types'
import { Product } from '../products/types'

export type Favorite = {
  id: number
  product: Product
  user: User
}

export type FindFavoriteByProductId = (product_id: Favorite['id']) => Favorite | undefined

export type AddToFavoritePayload = {
  user_id: number
  product_id: number
}

export type AddToFavorite = (payload: AddToFavoritePayload) => Promise<any>

export type GetFavoriteProducts = (user_id: number) => Promise<any>

// export type DeleteFromFavorite = (id: number) => Promise<any>

export type FavoriteContextProps = {
  favoriteProducts: Favorite[]
  getFavoriteProducts: GetFavoriteProducts
  addToFavorite: AddToFavorite
  findFavoriteByProductId: FindFavoriteByProductId
  loading: boolean
}
