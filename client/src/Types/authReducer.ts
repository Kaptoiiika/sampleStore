export interface User {
  username: string
  email: string
  status: string
  subscription: string[] | null
  uploads: string[] | null
}

export interface Token {
  access: string
}

export interface AuthState {
  user: User
  token: Token

  error: string | null
  loading: boolean
}

export interface AuthAction {
  type: string
  payload?: any
}
