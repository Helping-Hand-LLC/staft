const express = require('express');
const router = express.Router();

/**
 * GET /user/profile
 * 
 * @returns {JSON} all user information stored in db
 */
router.get('/profile', (req, res) => res.send(req.user));

/**
 * GET /user/events
 * 
 * @returns {JSON} all events in which this user is a participant
 */
router.get('/events', (req, res) => res.send('TODO: user events'));

/**
 * GET /user/messages
 * 
 * @return {JSON} all direct and group messages involving this user
 */
router.get('/messages', (req, res) => res.send('TODO: user messages'));

module.exports = router;