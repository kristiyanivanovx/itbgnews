const LocalStrategy = require('passport').Strategy
const bcrypt = require('bcrypt')
const userSchema = require('../Models/user-schema')
// initialize functions for getting email and id from database will be created later
// this function applies to be in session if you get
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        // this function needs Mongo DB
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }
    const localStrategy = new LocalStrategy({ usernameField: 'email' })
    passport.use(localStrategy, authenticateUser)
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize

function getUserByEmail(email){
    userSchema.findOne({'email' : email}, (error, person) => {
        if(error) return handleError(error)

    })
}