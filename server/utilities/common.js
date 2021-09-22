require('dotenv').config();

module.exports = {
  isEmpty: (object) => Object.keys(object).length === 0,
  getEnvironmentInfo: () => {
    const ENV = process.env.NODE_ENV || 'development';
    const isProduction = ENV === 'production';
    return [ENV, isProduction];
  },
};
