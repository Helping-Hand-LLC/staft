const express = require('express');

const router = express.Router();

// home route redirects to login page
router.get('/', (req, res) => res.redirect('/users/login'));

// dashboard
router.get('/dashboard', (req, res) => {
    res.send('dashboard');
});

module.exports = router;