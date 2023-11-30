import { Nullable } from "primevue/ts-helpers";
import { JWToken } from "~/types/User";

function getUserFromToken(): Nullable<JWToken> {
  const auth = useAuth()
  const { isAuthenticated } = auth;

  if(!isAuthenticated) return null

  const accessToken = auth.tokens?.accessToken!;
  const parsedToken: string = parseToken(accessToken)
  const decodedToken: JWToken = decodeToken(parsedToken);
  return decodedToken;
}

function parseToken(JWToken: string): string {
  const [ , cleanToken,  ] = JWToken.split('.')
  return cleanToken
}

function decodeToken(JWToken: string): JWToken {
  const base64Decoded = atob(JWToken)
  return JSON.parse(base64Decoded)
}

function tokenIsExpired(): boolean {
  const authToken = getUserFromToken();

  if(!authToken) return false

  const exp = authToken?.exp 
  const now = Math.floor(Date.now() / 1000)

  return (exp! <= now);
}

export {
  getUserFromToken,
  tokenIsExpired
}