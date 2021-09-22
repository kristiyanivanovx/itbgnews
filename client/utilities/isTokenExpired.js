import jwt from 'jsonwebtoken';

export default function isTokenExpired(accessTokenCookie) {
  const token = jwt.decode(accessTokenCookie);
  const now = new Date();

  if (!token) {
    console.log('No token found!');
    return true;
  }

  // return true if token is expired
  // return false if token is not expired
  return token.exp * 1000 < now.getTime();
}
