const express = require('express');
const router = express.Router();

/**
 * GET /events/:userId
 *
 * @returns {JSON} all events in which this user is a participant
 */
router.get('/:userId', (req, res) =>
  res.send(`TODO: ${req.params.userId} events`)
);

module.exports = router;
