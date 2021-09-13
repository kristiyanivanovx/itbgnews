module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    // staticFolder: '/static',

    LOCAL_FRONTEND_HOST: 'http://localhost:3000',
    LOCAL_BACKEND_HOST: 'http://localhost:5000',

    REMOTE_FRONTEND_HOST: 'https://itbgnews.herokuapp.com',
    REMOTE_BACKEND_HOST: 'https://itbgnews-api.herokuapp.com',
  },
}
