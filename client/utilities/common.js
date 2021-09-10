module.exports = {
    SUCCESSFUL_REGISTRATION_MESSAGE: 'Registered successfully.',
    EXISTING_USER_ERROR_CODE: 11000,
    BASE_URL: 'http://localhost:5000',
    isEmpty: (obj) => {
        if (obj === undefined || obj === null) {
            return true;
        }

        return JSON.stringify(obj) === '{}';
    },
};
