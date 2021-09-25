/**
 * @param {string} ENDPOINT - The endpoint where the request should be made
 * @param {string} userId - The userId's token to refresh
 * @returns {object} - An object with accessToken property
 */
export default async function refreshToken(ENDPOINT, userId) {
  return await fetch(ENDPOINT + '/token', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (!data) {
        console.log(
          'An unexpected error has occurred when renewing the access token.',
        );
        console.log('Data: ' + data);
        console.log('Access Token: ' + data?.accessToken);
        return;
      }

      return data;
    })
    .catch((err) => console.log(err));
}
