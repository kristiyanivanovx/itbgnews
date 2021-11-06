export default async function renewToken(ENDPOINT, userId) {
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
