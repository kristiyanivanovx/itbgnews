function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function validateUrl(url) {
  const re =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/i;
  return url.length > 0 && url.length < 1024 && re.test(url.toLowerCase());
}

function validatePassword(password) {
  const re = /\d/;
  return password.length > 10 && password.length < 35 && re.test(password);
}

module.exports = {
  validateEmail,
  validatePassword,
  validateUrl,
};
