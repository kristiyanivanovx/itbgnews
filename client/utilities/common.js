import {  publicRuntimeConfig } from '../next.config';

module.exports = {
    SUCCESSFUL_REGISTRATION_MESSAGE: 'Registered successfully.',
    USER_NOT_FOUND_ERROR_MESSAGE: 'There is no such user in the database.',
    INCORRECT_PASSWORD_ERROR_MESSAGE: 'Incorrect password',
    EXISTING_USER_ERROR_CODE: 11000,

    getEnvironmentInfo: () => {
        const ENV = process.env.NODE_ENV || 'development';

        const isProduction = ENV === 'production';

        const ENDPOINT =
            (ENV === 'production') ?
            (publicRuntimeConfig.REMOTE_BACKEND_HOST) :
            (publicRuntimeConfig.LOCAL_BACKEND_HOST);

        return [ENV, isProduction, ENDPOINT];
    }
};
