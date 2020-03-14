const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

const router = express.Router();

// home route redirects to login page
router.get('/', (req, res) => res.redirect('/users/login'));

// dashboard
router.get('/dashboard', ensureAuthenticated , (req, res) => {
    res.render('dashboard', { name: req.user.name });
});

module.exports = router;