/**
 * @param {string} updatedToken - The updated access token.
 */
export default async function renewCookie(updatedToken) {
  return await fetch('/api/setCookie', {
    method: 'POST',
    body: JSON.stringify({ accessToken: updatedToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
