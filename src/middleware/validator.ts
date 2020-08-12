import mongoose from 'mongoose';
import moment from 'moment';
import { check, validationResult, ValidationChain } from 'express-validator';
import MiddlewareFn from '../config/middleware';

type ValidatorFn = () => ValidationChain[];

export const loginRules: ValidatorFn = () => {
  return [
    check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').notEmpty().escape()
  ];
};

export const registerRules: ValidatorFn = () => {
  return [
    check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters')
      .escape()
      .isLength({ min: 6 }),
    check('passwordConfirm', 'Password confirmation is required')
      .notEmpty()
      .escape()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      })
  ];
};

export const createOrUpdateProfileRules: ValidatorFn = () => {
  return [
    check('name', 'Name is required').escape().notEmpty(),
    check('address.street', 'Street address is required').notEmpty().escape(),
    check('address.city', 'City is required').notEmpty().escape(),
    check('address.state', 'State is required').notEmpty().escape(),
    check('address.zip', 'Zip code is required').notEmpty().escape(),
    check('phone', 'Please enter a valid phone number')
      .notEmpty()
      .isMobilePhone('any'),
    check('birthday', 'Birthday is required').notEmpty().toDate(),
    check('gender', 'Gender is required').notEmpty().isIn([0, 1]),
    check('ssn', 'Social Security Number is required')
      .escape()
      .isLength({ min: 9, max: 9 })
      .isNumeric()
  ];
};

export const createOrgRules: ValidatorFn = () => {
  return [
    check('uid', 'uid is required and must have at least 4 characters')
      .escape()
      .isLength({ min: 4 })
      .custom(value => {
        if (value.indexOf(' ') >= 0) {
          throw new Error(
            'uid cannot contain whitespace (must be all one word)'
          );
        }
        return true;
      }),
    check('isPrivate').toBoolean(),
    check('adminEmail', 'Please enter a valid administrator email')
      .isEmail()
      .normalizeEmail()
  ];
};

export const updateOrgRules: ValidatorFn = () => {
  return [
    check('uid', 'uid must have at least 4 characters')
      .escape()
      .isLength({ min: 4 })
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
    check('workerEmail', 'Please enter a valid email for this worker')
      .isEmail()
      .normalizeEmail(),
    check('access', 'Please enter a valid access level for this worker')
      .escape()
      .isIn(['admin', 'manager', 'worker'])
  ];
};

export const createOrUpdateOrgEventRules: ValidatorFn = () => {
  return [
    check('isPublished').toBoolean(),
    check('title').escape(),
    check('location', 'Location is required').notEmpty(),
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
    check('links.*', 'Ensure all links are valid URLs').escape().isURL()
  ];
};

export const addOrRemoveEventParticipantRules: ValidatorFn = () => {
  return [
    check('worker', 'Worker is required')
      .notEmpty()
      .escape()
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
    check('query', 'location search term is required').notEmpty().escape()
  ];
};

export const createOrgEventLocationRules: ValidatorFn = () => {
  return [
    check('formatted_address', 'Formatted address is required')
      .notEmpty()
      .escape(),
    check('location.*').isDecimal(),
    check('icon').escape(),
    check('name', 'Event location name is required').notEmpty().escape(),
    check('place_id', 'Place ID is required').notEmpty().escape()
  ];
};

export const expValidate: MiddlewareFn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};
