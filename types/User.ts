import { JwtPayload } from "jsonwebtoken"

export interface User {
  email: string
  password?: string
  name: string
}

export interface UserModel extends User {
  id: string
}


export interface JWToken extends Partial<JwtPayload> {
  email: string
  name: string
  tokenType: string
}

export interface JWTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User,
  tokens: JWTokens
}