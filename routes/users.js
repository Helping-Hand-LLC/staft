const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Worker, validate, findExisting } = require('../models/Worker');

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
router.post('/login', (req, res) => {
    // TODO: implement me
});

// registration handler
router.post('/register', async (req, res) => {
    // console.log(req.body);
    const { email, phone, password, passwordConfirm } = req.body;
    // validate worker
    const errors = validate(req.body);
    if (errors.length > 0) return res.render('register', {
        errors,
        email,
        phone,
        password,
        passwordConfirm
    });

    // form validation passed; check for previously registered worker
    const errors2 = findExisting(req.body);
    if (errors2.length > 0) return res.render('register', {
        errors: errors2,
        email,
        phone,
        password,
        passwordConfirm
    });

    // email not previously registered; create new Worker
    let newWorker = new Worker({
        name: email.split('@')[0],
        phone,
        email,
        password
    });
    console.log(newWorker);

    // // encrypt password
    // bcrypt.genSalt(10, (err, salt) => {
    //     if (err) console.error(err);
    //     bcrypt.hash(worker.password, salt, async (err, hash) => {
    //         if (err) throw err;
    //         worker.password = hash;
    //         // save new Worker
    //         await worker
    //             .save()
    //             .then(async user => {
    //                 // generate authorization token
    //                 const token = await worker.generateAuthToken();

    //                 // store auth token in Local Storage for later usage
    //                 localStorage.setItem('staft-auth-token', token);
    //                 console.log(`worker auth token: ${token}`);

    //                 // show success message to user
    //                 req.flash('success_msg', 'Registration successful. Please log in.');

    //                 // redirect user to login page
    //                 res.redirect('/users/login');
    //             })
    //             .catch(err => {
    //                 console.error(err);

    //                 // show error message to user
    //                 req.flash('error_msg', 'Something went wrong. Please try again.');

    //                 // redirect back to register page
    //                 res.redirect('/users/register');
    //             });
    //     });
    // });
});

module.exports = router;