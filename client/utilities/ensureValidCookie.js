import jwt from 'jsonwebtoken';
import isTokenExpired from './isTokenExpired';
import renewToken from './refreshToken';
import renewCookie from './renewCookie';
import { getEndpoint } from './common';

const ensureValidCookie = async (accessToken) => {
  const ENDPOINT = getEndpoint();
  const userId = jwt.decode(accessToken).sub;
  const isExpired = isTokenExpired(accessToken);
  console.log(isExpired)

  const updatedToken = isExpired
    ? (await renewToken(ENDPOINT, userId)).accessToken
    : accessToken;

  isExpired ? await renewCookie(updatedToken) : null;

  return updatedToken;
};

export default ensureValidCookie;
