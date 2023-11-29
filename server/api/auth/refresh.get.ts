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
import { JWToken, UserModel } from "types/User"
import { getUserByEmail, getUserById } from "server/models/user"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authHeader: string = event.headers.get('Authorization')!
  const [ , refreshToken ] = authHeader.split(' ')
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