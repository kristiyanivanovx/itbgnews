import { publicRuntimeConfig } from '../next.config';
import cookie from 'cookie';

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
  UNAUTHORIZED_RESPONSE_CODE: 401,
  JWT_ACCESS_TIME: 60 * 60 * 24 * 7, // 7 days
  parseCookies: (req) => {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
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
