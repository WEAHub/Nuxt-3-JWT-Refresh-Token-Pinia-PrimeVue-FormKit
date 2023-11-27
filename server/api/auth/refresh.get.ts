/**
 * 
 * - Cojer la cabecera Authentication
 * - Parsear el token bearer
 * - Verificar el token
 * - Generar tokens nuevos
 */
import { User, JWToken, UserModel } from "~/types/User"
import jwt from 'jsonwebtoken'
import { HttpStatusCode } from "axios"
import { getUserByEmail } from "~/server/models/user"
import { Nullable } from "primevue/ts-helpers"

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
  
  const user: Nullable<Partial<UserModel>> = {...await getUserByEmail(tokenVerified.email)}
  delete user?.password;

  const tokens = generateTokens(user)
  return {
    user,
    tokens
  }

})