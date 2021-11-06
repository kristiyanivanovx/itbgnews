import jwt from 'jsonwebtoken';
import isTokenExpired from './isTokenExpired';
import renewToken from './renewToken';
import renewCookie from './renewCookie';
import getEndpoint from './getEndpoint';

const ensureValidCookie = async (accessToken) => {
  const ENDPOINT = getEndpoint();
  const userId = jwt.decode(accessToken).sub;
  const isExpired = isTokenExpired(accessToken);

  const updatedToken = isExpired
    ? (await renewToken(ENDPOINT, userId)).accessToken
    : accessToken;

  isExpired ? await renewCookie(updatedToken) : null;

  return updatedToken;
};

export default ensureValidCookie;
