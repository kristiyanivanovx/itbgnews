module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.dicebear.com',
      'dicebear.com',
      'res.cloudinary.com',
      'cloudinary.com',
    ],
  },
  publicRuntimeConfig: {
    LOCAL_FRONTEND_HOST: 'http://localhost:3000',
    LOCAL_BACKEND_HOST: 'http://localhost:5000',

    REMOTE_FRONTEND_HOST: 'https://itbgnews.herokuapp.com',
    REMOTE_BACKEND_HOST: 'https://itbgnews-api.herokuapp.com',

    MY_PROFILE_PATH: '/myProfile',
    INDEX_PATH: '/',
  },
};
