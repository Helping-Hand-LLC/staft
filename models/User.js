const mongoose = require('mongoose');
const Profile = require('./Profile');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/keys');

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'worker',
    enum: ['client', 'worker']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.generateAuthToken = function () {
  return new Promise((resolve, reject) => {
    Profile.findOne({ user: this.id })
      .then(profile => {
        // set access level in jwt payload
        let isAdmin = false,
          isManager = false,
          organization = null;
        if (profile) {
          isAdmin = profile.isAdmin;
          isManager = profile.isManager;
          organization = profile.organization;
        }

        const userJwtPayload = {
          id: this.id,
          isAdmin,
          isManager,
          organization,
          expiresIn: '2 days'
        };

        jwt.sign({ user: userJwtPayload }, privateKey, (err, token) => {
          if (err) reject(err);
          resolve(token);
        });
      })
      .catch(err => reject(err));
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
