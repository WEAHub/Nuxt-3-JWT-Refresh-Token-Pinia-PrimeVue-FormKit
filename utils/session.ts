import { JWToken } from "~/types/User";

function getUserFromToken(): JWToken {
  const auth = useAuth()
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
  const { exp } = getUserFromToken();
  const now = Math.floor(Date.now() / 1000)
  return (exp! <= now);
}

export {
  getUserFromToken,
  tokenIsExpired
}