const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local strategy for username and password authentication
passport.use(new LocalStrategy({
    usernameField: 'email' // Assuming email is used as the username
}, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        if (!user.verifyPassword(password)) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
    });
}));

module.exports = passport;