export type User = {
  id: number
  email: string
  name?: string
  lastLoginAt: Date | null
  isEmailConfirmed: boolean
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

export type AuthContextProps = {
  login: Login
  register: Register
  sendConfirmationLink: (token: string) => void
  resendConfirmationLink: () => void
  user: User
};
