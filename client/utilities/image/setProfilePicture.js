const setProfilePicture = async (response, userId) => {
  const style = `jdenticon`;

  return response.status === 200
    ? (await response.json()).img
    : `https://avatars.dicebear.com/api/${style}/${userId + Math.random()}.svg`;
};

export default setProfilePicture;
