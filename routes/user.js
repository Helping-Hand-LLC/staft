const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => res.send('GET [PROTECTED] /user/dashboard'));

router.get('/profile', (req, res) => res.send(req.user));

module.exports = router;