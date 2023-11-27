import type { H3Event } from 'h3'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserById } from 'models/user';
import { Nullable } from 'primevue/ts-helpers';
import { JWToken, JWTokens, UserModel } from '~/types/User';

function decryptToken(token: string, secretKey: string): JWToken {
  const tokenDecoded: JWToken = <JWToken>jwt.verify(token, secretKey);
  return tokenDecoded;
}

function getTokens(event: H3Event): JWTokens | undefined | null {
  const config = useRuntimeConfig()
  const cookie = getCookie(event, config.storeAuth)
  if (!cookie) return null
  const cookieParsed: any = JSON.parse(cookie);
  const { accessToken, refreshToken } = cookieParsed.tokens;
  return <JWTokens>{
    accessToken,
    refreshToken
  }
}

async function getUserFromSession(tokens: JWTokens) {
  const config = useRuntimeConfig()
  const tokenDecoded: JWToken = decryptToken(
    tokens?.accessToken!, 
    config.jwtSecret
  );
  return getUserById(tokenDecoded.userId) 
}

function checkTokenExpiration(token: string): boolean {
  const { exp }: JwtPayload = <JwtPayload>jwt.decode(token);
  const now = new Date().getTime();
  const isExpired = exp! <= now
  return isExpired;
}


function generateToken(buffer: object, secretKey: string, expiresIn: number): string {
  return jwt.sign(
    buffer, 
    secretKey, 
    { expiresIn }
  )
}

function generateTokens(userData: Nullable<Partial<UserModel>>): JWTokens {
  
  const config = useRuntimeConfig()

  // ACCESS TOKEN
  const accessTokenData = {
    ...userData,
    tokenType: 'access-token'  
  }
  
  const accessToken = generateToken(
    accessTokenData, 
    config.jwtSecret,
    5//config.accessTokenExpire
  )

  // REFRESH TOKEN
  const refreshTokenData = {
    ...userData,
    tokenType: 'refresh-token'  
  }

  const refreshToken = generateToken(
    refreshTokenData, 
    config.jwtSecret,
    config.refreshTokenExpire
  )

  return <JWTokens>{
    accessToken,
    refreshToken
  }
}

export {
  generateToken,
  generateTokens,
  decryptToken,
  getUserFromSession,
  checkTokenExpiration,
  getTokens
}