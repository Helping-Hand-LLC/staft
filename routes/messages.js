const express = require('express');
const router = express.Router();

/**
 * GET /messages/:userId
 *
 * @return {JSON} all direct and group messages involving this user
 */
router.get('/:userId', (req, res) =>
  res.send(`TODO: ${req.params.userId} messages`)
);

module.exports = router;
