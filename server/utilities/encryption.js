module.exports = {
    generateSalt: () => {
        return '123123123';
    },
    generateHashedPassword: (salt, password) => {
        return salt + password;
    }
}
