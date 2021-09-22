import jwt from 'jsonwebtoken';

export default function isTokenExpired(accessTokenCookie) {
  const token = jwt.decode(accessTokenCookie);

  // if (!token) {
  //   return true;
  // }

  const dateNow = new Date();

  // return true if token is not expired
  // return false if token is expired
  if (token.exp < dateNow.getTime()) {
    // Is Expired
    return true;
  } else {
    // Is Valid
    return false;
  }
}
