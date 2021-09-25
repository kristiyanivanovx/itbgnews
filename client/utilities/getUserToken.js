export default function getUserToken(cookies) {
  const tokens = cookies?.split(';');

  if (!tokens) {
    return false;
  }

  return tokens.find((token) => token.includes('accessToken'));
}
