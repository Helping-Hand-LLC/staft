import mongoose from 'mongoose';
import moment from 'moment';
import { check, validationResult, ValidationChain } from 'express-validator';
import MiddlewareFn from '../config/middleware';

type ValidatorFn = () => ValidationChain[];

export const loginRules: ValidatorFn = () => {
  return [
    check('email').notEmpty().isEmail().normalizeEmail(),
    check('password').notEmpty().escape().withMessage('Password is required')
  ];
};

export const registerRules: ValidatorFn = () => {
  return [
    check('email').notEmpty().isEmail().normalizeEmail(),
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
        return true;
      })
  ];
};

export const createOrgRules: ValidatorFn = () => {
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
        return true;
      }),
    check('isPrivate').toBoolean()
  ];
};

export const updateOrgRules: ValidatorFn = () => {
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
        return true;
      }),
    check('isPrivate').toBoolean()
  ];
};

export const addWorkerToOrgRules: ValidatorFn = () => {
  return [
    check('workerEmail')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email for this worker'),
    check('access')
      .escape()
      .notEmpty()
      .isIn(['admin', 'manager', 'worker'])
      .withMessage('Please enter a valid access level for this worker')
  ];
};

export const createOrUpdateProfileRules: ValidatorFn = () => {
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
      .isMobilePhone('any')
      .withMessage('Please enter a valid phone number'),
    check('birthday').notEmpty().toDate().withMessage('Birthday is required'),
    check('gender').notEmpty().isIn([0, 1]).withMessage('Gender is required'),
    check('ssn').escape().notEmpty().isLength({ min: 9, max: 9 }).isNumeric()
  ];
};

export const createOrUpdateOrgEventRules: ValidatorFn = () => {
  return [
    check('isPublished').toBoolean(),
    check('title').escape(),
    check('location').notEmpty().withMessage('Location is required'),
    // ensure start and end are not equal or overlapping
    check('startDateTime')
      .toDate()
      .custom((value, { req }) => {
        if (value && moment(value).isSameOrAfter(req.body.endDateTime)) {
          throw new Error('Start date cannot be equal or after end date');
        }

        return true;
      }), // null if not valid Date
    check('endDateTime')
      .toDate()
      .custom((value, { req }) => {
        if (value && moment(value).isSameOrBefore(req.body.startDateTime)) {
          throw new Error('End date cannot be equal or before start date');
        }

        return true;
      }), // null if not valid Date
    check('isRepeatEvent').toBoolean(),
    check('repeatOptions.daysOfWeek.*')
      .escape()
      .isIn(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
    check('repeatOptions.frequency.value').optional().isInt(),
    check('repeatOptions.frequency.multiplier')
      .escape()
      .optional()
      .isIn(['weeks', 'months', 'years']),
    // ensure repeatOptions.ends is not equal or overlapping to original event date
    check('repeatOptions.ends')
      .toDate()
      .custom((value, { req }) => {
        if (value && moment(value).isSameOrBefore(req.body.startDateTime)) {
          throw new Error(
            'Repeat end date cannot be equal or before start date'
          );
        }

        return true;
      }), // null if not valid Date
    check('links').isArray().optional(),
    check('links.*').escape().isURL()
  ];
};

export const addOrRemoveEventParticipantRules: ValidatorFn = () => {
  return [
    check('worker')
      .escape()
      .notEmpty()
      .withMessage('Worker is required')
      .custom(value => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('Invalid ObjectId');
        }
        return true;
      })
  ];
};

export const updateEventParticipantRules: ValidatorFn = () => {
  return [
    check('confirmedStatus')
      .escape()
      .isIn(['unconfirmed', 'accepted', 'rejected']),
    check('checkedIn.status').toBoolean(),
    check('checkedIn.datetime').optional().toDate(),
    check('checkedOut.status').toBoolean(),
    check('checkedOut.datetime').optional().toDate()
  ];
};

export const queryOrgEventLocationRules: ValidatorFn = () => {
  return [
    check('query')
      .escape()
      .notEmpty()
      .withMessage('location search term is required')
  ];
};

export const createOrgEventLocationRules: ValidatorFn = () => {
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
};

export const expValidate: MiddlewareFn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};
