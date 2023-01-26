import { FullUser } from '../auth/types'
import { Product } from '../products/types'

export type Favorite = {
  id: number
  product: Product
  user: FullUser
}

export type AddToFavoritePayload = {
  user_id: number
  product_id: number
}

export type AddToFavorite = (payload: AddToFavoritePayload) => Promise<any>

export type GetFavoriteProducts = (user_id: number) => Promise<any>

export type DeleteFromFavorite = (id: number) => Promise<any>

export type FavoriteContextProps = {
  favoriteProducts: Favorite[]
  getFavoriteProducts: GetFavoriteProducts
  addToFavorite: AddToFavorite
  deleteFromFavorite: DeleteFromFavorite
}
