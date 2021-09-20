export default function refreshToken(ENDPOINT, userId) {
  return fetch(ENDPOINT + '/token', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (!data || !data.accessToken) {
        console.log(
          'An unexpected error has occurred when renewing the access token.',
        );
        console.log('Data: ' + data);
        console.log('Access Token: ' + data?.accessToken);
        return;
      }

      return data.accessToken;
    });
}
