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

      console.log('dATA, TOKENS');
      console.log(data);
      console.log(data.accessToken);

      return data.accessToken;
    })
    .catch((err) => console.log(err));
}
