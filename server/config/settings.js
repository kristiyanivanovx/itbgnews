module.exports = {
    development: {
        db: 'mongodb://localhost:27017/itbgnews',
        port: 5000,
    },
    staging: {
    },
    production: {
        port: process.env.PORT
    }
}
