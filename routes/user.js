const express = require('express');
const router = express.Router();

/**
 * GET /user/profile
 *
 * @returns {JSON} all user information stored in db
 */
router.get('/profile', (req, res) => res.send(req.user));

module.exports = router;
