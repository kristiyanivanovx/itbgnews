const setProfilePicture = async (response, userId) => {
  const style = `jdenticon`;

  // let image = null;
  // if (response.status === 200) {
  //   const { img } = await response.json();
  //   image = img;
  // } else {
  //   const style = `jdenticon`;
  //   const randomized = userId + Math.random();
  //   image = `https://avatars.dicebear.com/api/${style}/${randomized}.svg`;
  // }

  return response.status === 200
    ? await response.json().img
    : `https://avatars.dicebear.com/api/${style}/${userId + Math.random()}.svg`;
};

export default setProfilePicture;
