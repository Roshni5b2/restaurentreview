const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const lodash = require('lodash');
const mongoose = require('mongoose');

var Userdata = mongoose.model('Userdata');

passport.use(
    new localStrategy({usernameField: 'email'},
    (username, password, done) => {
        Userdata.findOne({ email: username },
            (err, userdata) => {
                if(err)
                    return done(err);
                //unknown user
                else if (!user)
                    return done(null, false, { message: 'Email is not registered' });
                else if (!user.verifyPassword(password))
                    return done(null, false, { message: 'Wrong password.' });
                else
                    return done(null, user);
            });
    })
);








