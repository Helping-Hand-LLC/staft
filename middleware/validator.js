const { check, validationResult } = require('express-validator');

module.exports = {
  loginRules: () => {
    return [
      check('email')
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email'),
      check('password').notEmpty().escape().withMessage('Password is required')
    ];
  },
  registerRules: () => {
    return [
      check('email')
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email'),
      check('password')
        .notEmpty()
        .escape()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
      check('passwordConfirm')
        .notEmpty()
        .escape()
        .withMessage('Password confirmation is required')
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords do not match');
          }
          // Indicates the success of this synchronous custom validator
          return true;
        })
    ];
  },
  newOrgRules: () => {
    return [
      check('uid')
        .notEmpty()
        .escape()
        .isLength({ min: 4 })
        .withMessage('uid is required and must have at least 4 characters')
        .custom(value => {
          if (value.indexOf(' ') >= 0) {
            throw new Error(
              'uid cannot contain whitespace (must be all one word)'
            );
          }
          // Indicates the success of this synchronous custom validator
          return true;
        }),
      check('isPrivate').toBoolean(),
      check('adminEmail')
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email')
    ];
  },
  updateOrgRules: () => {
    return [
      check('uid')
        .escape()
        .isLength({ min: 4 })
        .withMessage('uid must have at least 4 characters')
        .custom(value => {
          if (value.indexOf(' ') >= 0) {
            throw new Error(
              'uid cannot contain whitespace (must be all one word)'
            );
          }
          // Indicates the success of this synchronous custom validator
          return true;
        }),
      check('isPrivate').toBoolean(),
      check('adminEmails')
        .notEmpty()
        .withMessage('An organization must have at least one admin user'),
      check('adminEmails.*')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter valid emails for the admin users'),
      check('managerEmails.*')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter valid emails for the manager users'),
      check('clientEmails.*')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter valid emails for the client users'),
      check('workerEmails.*')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter valid emails for the worker users')
    ];
  },
  newProfileRules: () => {
    return [
      check('name').escape().notEmpty().withMessage('Name is required'),
      check('address.street')
        .escape()
        .notEmpty()
        .withMessage('Please enter a valid street address'),
      check('address.city')
        .escape()
        .notEmpty()
        .withMessage('Please enter a valid city'),
      check('address.state').escape().notEmpty(),
      check('address.zip').notEmpty().withMessage('Zip code is required'),
      check('phone')
        .notEmpty()
        .isMobilePhone()
        .withMessage('Please enter a valid phone number'),
      check('birthday').notEmpty().toDate().withMessage('Birthday is required'),
      check('gender')
        .notEmpty()
        .isIn(['male', 'female'])
        .withMessage('Gender is required'),
      check('ssn').escape().notEmpty().isLength({ min: 9, max: 9 }).isNumeric()
    ];
  },
  orgEventRules: () => {
    return [
      check('isPublished').toBoolean(),
      check('title').escape(),
      check('location').notEmpty().withMessage('Location is required'),
      // TODO: ensure start and end are not equal or overlapping
      check('startDateTime').toDate(), // null if not valid Date
      check('endDateTime').toDate(), // null if not valid Date
      check('isRepeatEvent').toBoolean(),
      // TODO: ensure repeatOptions.ends is not equal or overlapping to original event date
      check('repeatOptions.daysOfWeek.*')
        .escape()
        .isIn(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
      check('repeatOptions.frequency.value').optional().isInt(),
      check('repeatOptions.frequency.multiplier')
        .escape()
        .optional()
        .isIn(['weeks', 'months', 'years']),
      check('repeatOptions.ends').toDate(), // null if not valid Date
      check('participants').isArray(),
      check('participants.confirmedStatus')
        .escape()
        .optional()
        .isIn(['unconfirmed', 'accepted', 'rejected']),
      check('links').isArray().optional(),
      check('links.*').escape().isURL()
    ];
  },
  orgEventParticipantRules: () => {
    return [
      // TODO: implement me
    ];
  },
  orgEventLocationRules: () => {
    return [
      check('query')
        .escape()
        .notEmpty()
        .withMessage('location search term is required')
    ];
  },
  newOrgEventLocationRules: () => {
    return [
      check('formatted_address')
        .escape()
        .notEmpty()
        .withMessage('Formatted address is required'),
      check('location.*').isDecimal(),
      check('icon').escape(),
      check('name')
        .escape()
        .notEmpty()
        .withMessage('Event location name is required'),
      check('place_id').escape().notEmpty().withMessage('Place ID is required')
    ];
  },
  expValidate: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
};
