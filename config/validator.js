const { check, validationResult } = require('express-validator');

const loginRules = () => {
  return [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email'),
    check('password').escape()
  ];
};

const registerRules = () => {
  return [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email'),
    check('password')
      .escape()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    check('passwordConfirm')
      .escape()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      })
  ];
};

const newOrgRules = () => {
  return [
    check('uid')
      .escape()
      .isLength({ min: 4 })
      .withMessage('uid must be at least 4 characters'),
    check('isPrivate').toBoolean(),
    check('adminEmail')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email')
  ];
};

const newProfileRules = () => {
  return [
    check('organization').escape(),
    check('name').escape(),
    check('address').isJSON(),
    check('address.street').escape().notEmpty().matches(),
    check('address.city').escape().notEmpty(),
    check('address.state').escape().notEmpty(),
    check('address.zip').notEmpty(),
    check('address.country').escape(),
    check('phone').notEmpty().isMobilePhone(),
    check('birthday').toDate(),
    check('gender').isIn(['male', 'female']),
    check('ssn').escape().notEmpty().matches()
  ];
};

const expValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  loginRules,
  registerRules,
  newOrgRules,
  newProfileRules,
  expValidate
};
