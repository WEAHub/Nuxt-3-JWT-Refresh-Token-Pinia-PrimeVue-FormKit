import { getUserByEmail } from 'models/user'
import { Nullable } from 'primevue/ts-helpers'
import { User, UserModel } from 'types/User'
import { generateTokens } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const body: User = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: 'Email address and password are required',
    })
  }

  const user: Nullable<Partial<UserModel>> = {...await getUserByEmail(email)}

  if (!user) {
    return createError({ 
      statusCode: 401,
      message: 'Bad credentials',
    })
  }

  const verified = await verify(password, user?.password!)
  delete user?.password;

  if (!verified) {
    return createError({
      statusCode: 401,
      message: 'Bad credentials',
    })
  }

  const tokens = generateTokens(user)
  return {
    user,
    tokens
  }
})



