import { HttpStatusCode } from 'axios'
import { getUserByEmail } from 'models/user'
import { Nullable } from 'primevue/ts-helpers'
import { User, UserModel } from 'types/User'
import { generateTokens } from '~/server/utils/session'

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

  const dbUser = await getUserByEmail(email);

  if (!dbUser) {
    return createError({ 
      statusCode: HttpStatusCode.Forbidden,
      statusMessage: 'Login error',
      message: 'Bad credentials',
    })
  }

  const user: Nullable<Partial<UserModel>> = {...dbUser}
  const verified = await verify(password, user?.password!)
  delete user?.password;

  if (!verified) {
    return createError({
      statusCode: HttpStatusCode.Forbidden,
      statusMessage: 'Login error',
      message: 'Bad credentials',
    })
  }

  const tokens = generateTokens(user)
  return {
    user,
    tokens
  }
})



