const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { Worker, validate } = require('../models/Worker');

const router = express.Router();

// login page
router.get('/login', (req, res) => {
    res.render('login');
});

// registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// forgot password page
router.get('/forgot', (req, res) => {
    res.send('forgot');
});

// login handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// registration handler
router.post('/register', async (req, res) => {
    // console.log(req.body);
    const { email, phone, password, passwordConfirm } = req.body;
    // validate worker
    let errors = validate(req.body);
    if (errors.length > 0) {
        res.render('register', {
            errors,
            email,
            phone,
            password,
            passwordConfirm
        });
    } else {
        // form validation passed; check for previously registered worker
        Worker.findOne({ email: email })
            .then(result => {
                if (result) {
                    errors.push({ msg: 'Email already exists.' });
                    res.render('register', {
                        errors,
                        email,
                        phone,
                        password,
                        passwordConfirm
                    });
                } else {
                    // email not previously registered; create new Worker
                    const newWorker = new Worker({
                        name: email.split('@')[0],
                        phone,
                        email,
                        password
                    });
                    console.log(newWorker);

                    // encrypt password
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.error(err);
                        bcrypt.hash(newWorker.password, salt, (err, hash) => {
                            if (err) throw err;
                            newWorker.password = hash;
                            // save new Worker
                            newWorker
                                .save()
                                .then(worker => {
                                    // generate authorization token
                                    // const token = await newWorker.generateAuthToken();

                                    // store auth token in Local Storage for later usage
                                    // localStorage.setItem('staft-auth-token', token);
                                    // console.log(`newWorker auth token: ${token}`);

                                    // show success message to user
                                    req.flash('success_msg', 'Registration successful. Please log in.');

                                    // redirect user to login page
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.error(err);

                                    // show error message to user
                                    req.flash('error_msg', 'Something went wrong. Please try again.');

                                    // redirect back to register page
                                    res.redirect('/users/register');
                                });
                        });
                    });
                }
            });
    }
});

module.exports = router;