import { HttpStatusCode } from 'axios'
import { getUserByEmail } from 'models/user'
import { User, UserModel } from 'types/User'
import { Nullable } from 'primevue/ts-helpers'
import { generateTokens } from 'server/utils/session'

export default defineEventHandler(async (event) => {
  const body: User = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    return createError({
      statusCode: HttpStatusCode.BadRequest,
      statusMessage: 'Login error',
      message: 'Email address and password are required',
    })
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return createError({ 
      statusCode: HttpStatusCode.Forbidden,
      statusMessage: 'Login error',
      message: 'Bad credentials',
    })
  }

  const verified = await verify(password, user?.password!)

  if (!verified) {
    return createError({
      statusCode: HttpStatusCode.Forbidden,
      statusMessage: 'Login error',
      message: 'Bad credentials',
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



