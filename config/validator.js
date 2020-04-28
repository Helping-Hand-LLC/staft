const { check, validationResult } = require('express-validator');

const loginRules = () => {
  return [
    check('email')
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email'),
    check('password').notEmpty().escape().withMessage('Password is required')
  ];
};

const registerRules = () => {
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
};

const newOrgRules = () => {
  return [
    check('uid')
      .escape()
      .isLength({ min: 4 })
      .custom(value => {
        if (str.indexOf(' ') >= 0) {
          throw new Error(
            'uid cannot contain whitespace (must be all one word)'
          );
        }
        // Indicates the success of this synchronous custom validator
        return true;
      })
      .withMessage('uid must be at least 4 characters'),
    check('isPrivate').toBoolean(),
    check('adminEmail')
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email')
  ];
};

const newProfileRules = () => {
  return [
    check('organization').escape(),
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
