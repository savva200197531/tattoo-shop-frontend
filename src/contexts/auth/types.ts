import { CartItem } from '../cart/types'
import { Favorite } from '../favorite/types'

export type User = {
  id: number
  email: string
  name?: string
  lastLoginAt: string | null
  isEmailConfirmed: boolean
  cart: CartItem[]
  favorite: Favorite[]
  role: 'User' | 'Admin'
}

export type RegisterPayload = LoginPayload & {
  name?: string
}

export type Register = (payload: RegisterPayload) => Promise<any>

export type LoginPayload = {
  email: string
  password: string
}

export type Login = (payload: LoginPayload) => Promise<any>

export type SendConfirmationLink = (token: string) => Promise<any>

export type Logout = () => void

export type GetUser = (id: number) => Promise<any>

export type AuthContextProps = {
  login: Login
  register: Register
  sendConfirmationLink: SendConfirmationLink
  resendConfirmationLink: () => void
  user: User
  logout: Logout
  getUser: GetUser
  setUser: (value: User) => void
  isUserExist: boolean
};
