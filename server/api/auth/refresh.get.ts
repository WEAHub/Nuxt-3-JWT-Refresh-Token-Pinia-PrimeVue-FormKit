/**
 * 
 * - Cojer la cabecera Authentication
 * - Parsear el token bearer
 * - Verificar el token
 * - Generar tokens nuevos
 */
import jwt from 'jsonwebtoken'
import { HttpStatusCode } from "axios"
import { Nullable } from "primevue/ts-helpers"
import { AuthResponse, JWToken, UserModel } from "types/User"
import { getUserByEmail, getUserById } from "server/models/user"

export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig()
  
  const cookies: any = parseCookies(event);

  const authCookie: Nullable<string> = cookies?.auth

  if(!authCookie) {
    return createError({
      statusCode: HttpStatusCode.Unauthorized
    })
  };

  const parsedAuth: Nullable<AuthResponse> = JSON.parse(authCookie);

  const authTokens = parsedAuth?.tokens!;

  if(!authTokens) {
    return createError({
      statusCode: HttpStatusCode.Unauthorized
    })
  };
  
  const { refreshToken } = authTokens

  if(!refreshToken) {
    return createError({
      statusCode: HttpStatusCode.Unauthorized
    })
  };

  const tokenVerified: JWToken = <JWToken>jwt.verify(refreshToken, config.jwtSecret);
  
  if(!tokenVerified) {
    return createError({
      statusCode: HttpStatusCode.Unauthorized
    })
  }
  
  const user: Nullable<UserModel> = await getUserById(tokenVerified.id)

  if(!user) {
    return createError({
      statusCode: HttpStatusCode.BadRequest
    })
  }

  const tokenData: Partial<UserModel> = { 
    id: user.id
  }

  const tokens = generateTokens(tokenData)
  return {
    user,
    tokens
  }

})