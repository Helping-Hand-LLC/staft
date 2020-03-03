const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/forgot', (req, res) => {
    res.send('forgot');
});

module.exports = router;