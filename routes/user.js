const express = require('express');
const router = express.Router();

/**
 * GET /user/profile
 *
 * @returns {JSON} get user profile information
 */
router.get('/profile', (req, res) => res.send(req.user));

module.exports = router;
