const  validator = require('validator');


function validateEmail(email) {
  return validator.isEmail(email)
}

function validateUrl(url) {
  return validator.isUrl(url)
}

function validatePassword(password) {
  const re = /\d/;
  return password.length >= 8 && password.length <= 35 && re.test(password);
}

module.exports = {
  validatePassword,
  validateEmail,
  validateUrl
};
