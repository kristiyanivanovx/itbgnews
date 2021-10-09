const setProfilePicture = async (response, userId) => {
  let image = null;

  // todo: convert to ternary
  if (response.status === 200) {
    const { img } = await response.json();
    image = img;
  } else {
    const style = `jdenticon`;
    const randomized = userId + Math.random();
    image = `https://avatars.dicebear.com/api/${style}/${randomized}.svg`;
  }

  return image;
};

export default setProfilePicture;
