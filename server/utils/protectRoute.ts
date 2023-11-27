import jwt from 'jsonwebtoken'
import { JWToken, JWTokens } from '~/types/User';
import { H3Event, EventHandlerRequest } from 'h3'
import { Nullable } from 'primevue/ts-helpers';

export default async (event: H3Event<EventHandlerRequest>) => {

  const cookies: Nullable<JWTokens> = getTokens(event);
  
  if(!cookies) {
    throw createError({
      statusCode: 401
    })
  }
  
  const config = useRuntimeConfig()
  const tokenVerified: JWToken = <JWToken>jwt.verify(
    cookies?.accessToken!,
    config.jwtSecret, 
    { ignoreExpiration: true}
  );

  if(!tokenVerified) {
    throw createError({
      statusCode: 401
    })
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = tokenVerified.exp!

  if(exp <= now) {
    throw createError({
      statusCode: 401
    })
  }
  
};