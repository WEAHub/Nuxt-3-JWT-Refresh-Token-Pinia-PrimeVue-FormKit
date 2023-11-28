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


export interface JWToken extends Partial<JwtPayload>, User {
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