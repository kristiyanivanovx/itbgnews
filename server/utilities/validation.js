function validatePassword(password) {
  const re = /\d/;
  return password.length >= 8 && password.length <= 35 && re.test(password);
}

module.exports = {
  validatePassword,
};
