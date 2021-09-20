import jwt from 'jsonwebtoken';

export default function isTokenValid(accessTokenCookie) {
  const token = jwt.decode(accessTokenCookie, { complete: true });

  if (!token) {
    return false;
  }

  const dateNow = new Date();

  // return true if token is not expired
  // return false if token is expired
  return token.exp < dateNow.getTime();
}
