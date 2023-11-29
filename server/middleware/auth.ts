
import { H3Event } from "h3";
import { Nullable } from "primevue/ts-helpers"
import { AuthResponse, JWToken, UserModel } from "types/User";

function getAuthUser(event: H3Event): Nullable<UserModel> {
  const cookies: any = parseCookies(event);

  const authCookie: Nullable<string> = cookies?.auth

  if(!authCookie) return null;

  const parsedAuth: Nullable<AuthResponse> = JSON.parse(authCookie);

  const authTokens = parsedAuth?.tokens!;

  if(!authTokens) return null;
  
  const { accessToken } = authTokens

  if(!accessToken) return null;

  const config = useRuntimeConfig()

  try {
    const tokenDecrypted: JWToken = decryptToken(accessToken, config.jwtSecret)
  
    if(!tokenDecrypted) return null

    const user: UserModel = {
      id: tokenDecrypted.id,
      name: tokenDecrypted.name,
      email: tokenDecrypted.email,
      avatarURL: tokenDecrypted.avatarURL
    }

    return user
  }
  catch(e) {
    return null
  }

}

export default defineEventHandler((event) => {
  const authUser: Nullable<UserModel> = getAuthUser(event);
  event.context.user = authUser
})