const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { Worker } = require('../models/Worker');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match worker
            Worker.findOne({ email: email })
                .then(worker => {
                    // check if this worker is registered
                    if (!worker) return done(null, false, { message: 'Email not registered.' });
                    // match password
                    bcrypt.compare(password, worker.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) return done(null, worker);
                        else return done(null, false, { message: 'Password incorrect.' });
                    });
                })
                .catch(err => done(err));
        })
    );

    passport.serializeUser((worker, done) => {
        done(null, worker.id);
    });

    passport.deserializeUser((id, done) => {
        Worker.findById(id, (err, worker) => {
            done(err, worker);
        });
    });
}