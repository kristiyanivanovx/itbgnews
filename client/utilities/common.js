import { publicRuntimeConfig } from '../next.config';

module.exports = {
  SUCCESSFUL_REGISTRATION_MESSAGE: 'Registered successfully.',
  USER_NOT_FOUND_ERROR_MESSAGE: 'There is no such user in the database.',
  INCORRECT_PASSWORD_ERROR_MESSAGE: 'Incorrect password',
  CANNOT_FIND_POST_ERROR: 'Cannot find post with id',
  INVALID_ID: 'Cast to ObjectId failed for value',
  EXISTING_USER_ERROR_CODE: 11000,
  CREATED_RESPONSE_CODE: 201,
  DELETED_RESPONSE_CODE: 200,
  SUCCESS_RESPONSE_CODE: 200,
  EDITED_RESPONSE_CODE: 200,
  REMOVED_RESPONSE_CODE: 200,
  JWT_ACCESS_TIME: 60 * 2, // 2 minutes
  JWT_REFRESH_TIME: 60 * 60 * 24 * 30, // 30 days

  // refresh token by tutorial, access token otherwise
  refresh: async (token, ENDPOINT) => {
    console.log('Refreshing token...');

    return new Promise((resolve, reject) => {
      fetch(ENDPOINT + '/token', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === false) {
            console.log('4?');
            console.error(data.message);
            reject(false);
          } else {
            console.log('5?');
            const { accessToken } = data.data;
            resolve(accessToken);
          }
        });
    });
  },

  requestLogin: (accessToken, refreshToken, ENDPOINT, route) => {
    return new Promise((resolve, reject) => {
      fetch(ENDPOINT + '/' + route, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
        .then((data) => data.json())
        .then(async (data) => {
          if (data.status === false) {
            if (data.message === 'Invalid request.') {
              console.error(data.message);
            } else if (
              data.message === 'Invalid request. Token is not in store.'
            ) {
              console.error(data.message);
            } else if (
              data.message === 'Invalid request. Token is not same in store.'
            ) {
              console.error(data.message);
            }
            if (data.message === 'Your session is not valid.') {
              console.error(data.message);
            }
          } else {
            const accessToken = await module.exports.refresh(
              refreshToken,
              ENDPOINT,
            );
            return await module.exports.requestLogin(
              accessToken,
              refreshToken,
              ENDPOINT,
              route,
            );
          }
        });
    });
  },

  // handleChange: (e) => {},
  // handleSubmit: (e) => {},

  hasAccess: async (accessToken, refreshToken, ENDPOINT) => {
    console.log('1');
    if (!refreshToken) {
      return null;
    }

    console.log('2');

    if (accessToken === undefined) {
      console.log('2.5');

      // generate new access token
      return await module.exports.refresh(refreshToken, ENDPOINT);
    }
    console.log('3');

    return accessToken;
  },

  /**
   * @param {string} accessToken - The access token
   * @param {string} refreshToken, - The refresh token
   */
  protect: async (accessToken, refreshToken) => {
    accessToken = await module.exports.hasAccess(accessToken, refreshToken);

    if (!accessToken) {
      console.error('No access token has been found, login again');
      // set message saying login again
    } else {
      await module.exports.requestLogin(accessToken, refreshToken);
    }
  },

  getEnvironmentInfo: () => {
    const ENV = process.env.NODE_ENV || 'development';

    const isProduction = ENV === 'production';

    const ENDPOINT =
      ENV === 'production'
        ? publicRuntimeConfig.REMOTE_BACKEND_HOST
        : publicRuntimeConfig.LOCAL_BACKEND_HOST;

    return [ENV, isProduction, ENDPOINT];
  },
};
