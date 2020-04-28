const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/keys');

const generateUserJwt = user => {
  jwt.sign(
    {
      id: user.id,
      expiresIn: '2 days'
    },
    privateKey,
    (err, token) => {
      if (err) next(err);
      return token;
    }
  );
};

module.exports = generateUserJwt;
