import { publicRuntimeConfig } from '../next.config';

module.exports = {
  SUCCESSFUL_REGISTRATION_ERROR: 'Registered successfully.',
  USER_NOT_FOUND_ERROR: 'There is no such user in the database.',
  INCORRECT_PASSWORD_ERROR: 'Incorrect password',
  CANNOT_FIND_POST_ERROR: 'Cannot find post with id',
  INVALID_ID_ERROR: 'Cast to ObjectId failed for value',
  INVALID_EMAIL_ERROR: 'The provided email is not a valid email.',
  NO_USER_FOUND_ERROR:
    'No user with that email has been found in the database.',
  INVALID_PASSWORD_ERROR:
    'The password must have one digit at least and be between 8 and 35 symbols.',
  PASSWORD_CHANGED_SUCCESSFULLY: 'Your password has been changed successfully.',
  EXISTING_USER_ERROR_CODE: 11000,
  CREATED_RESPONSE_CODE: 201,
  DELETED_RESPONSE_CODE: 200,
  SUCCESS_RESPONSE_CODE: 200,
  EDITED_RESPONSE_CODE: 200,
  REMOVED_RESPONSE_CODE: 200,
  UNAUTHORIZED_RESPONSE_CODE: 401,
  pluralizeReplies: (number) => {
    if (number === 1) {
      return 'отговор';
    }

    return 'отговора';
  },
  pluralizeComments: (number) => {
    if (number === 1) {
      return 'коментар';
    }

    return 'коментара';
  },
  isEmpty: (obj) => Object.keys(obj).length === 0,
  getEndpoint: () => {
    const ENV = process.env.NODE_ENV || 'development';
    const isProduction = ENV === 'production';
    return isProduction
      ? publicRuntimeConfig.REMOTE_BACKEND_HOST
      : publicRuntimeConfig.LOCAL_BACKEND_HOST;
  },
};
