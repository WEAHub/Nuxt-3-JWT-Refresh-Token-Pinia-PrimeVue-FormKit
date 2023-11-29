import { JwtPayload } from "jsonwebtoken"

export interface User {
  email: string
  password?: string
  name: string
  avatarURL: string
}

export interface UserModel extends User {
  id: string
}


export interface JWToken extends Partial<JwtPayload> {
  id: string
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