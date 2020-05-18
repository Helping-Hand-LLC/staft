const express = require('express');
const { newProfileRules, expValidate } = require('../middleware/validator');
const { checkProfile } = require('../middleware/models');
const {
  getUser,
  getUserProfile,
  createOrUpdateProfile,
  deleteUserAndProfile
} = require('../controllers/user');
const router = express.Router();

/**
 * GET /user/me
 *
 * @desc get basic user information from database
 * @returns {JSON} user type, email, password, and date
 * @access private
 */
router.get('/me', getUser);

/**
 * GET /user/profile/me
 *
 * @desc get user profile information from database
 * @returns {JSON} user profile information
 * @access private
 */
router.get('/profile/me', checkProfile, getUserProfile);

/**
 * POST /user/profile
 *
 * @desc create or update new user profile
 * @returns {JSON} newly created / updated user profile information
 * @access private
 */
router.post('/profile', newProfileRules(), expValidate, createOrUpdateProfile);

/**
 * DELETE /user/profile/me
 *
 * @desc delete user and their associated profile
 * @returns {JSON} success indicator
 * @access private
 */
router.delete('/profile/me', deleteUserAndProfile);

module.exports = router;
