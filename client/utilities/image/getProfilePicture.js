import ensureValidCookie from '../auth/ensureValidCookie';

const getProfilePicture = async (accessToken, ENDPOINT) => {
  console.log(`${ENDPOINT}/my-profile/image`);
  return await fetch(`${ENDPOINT}/my-profile/image`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
    },
  });
};

export default getProfilePicture;
