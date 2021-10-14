const isTokenPresent = (accessToken, hook) => {
  if (!accessToken) {
    hook(() => true);
    return false;
  }
};

export default isTokenPresent;
