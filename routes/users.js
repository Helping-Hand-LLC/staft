const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
router.post('/login', (req, res) => {
    // TODO: implement me
});

// registration handler
router.post('/register', async (req, res) => {
    // validate worker
    const errors = validate(req.body);
    if (errors.length > 0) return res.status(400).send(errors.forEach(err => err.msg)); // TODO: show error message on registration page

    // find existing worker
    let worker = await Worker.findOne({ email: req.body.email });
    if (worker) {
        req.flash('error_msg', 'Email already registered.');
        return res.redirect('/users/register');
    }

    // create new Worker
    worker = new Worker({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password = req.body.password
    });

    // encrypt password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error(err);
        bcrypt.hash(worker.password, salt, (err, hash) => {
            if (err) throw err;
            worker.password = hash;
            // save new Worker
            await worker
                .save()
                .then(user => {
                    // generate authorization token
                    const token = await worker.generateAuthToken();

                    // store auth token in Local Storage for later usage
                    localStorage.setItem('staft-auth-token', token);
                    console.log(`worker auth token: ${token}`);

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
});

module.exports = router;