import { ACCESS_TOKEN_NAME } from '../infrastructure/names';

export default function getUserToken(cookies) {
  const tokens = cookies?.split(';');

  if (!tokens) {
    return false;
  }

  return tokens.find((token) => token.includes(ACCESS_TOKEN_NAME));
}
