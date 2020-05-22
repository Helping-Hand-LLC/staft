import mongoose from 'mongoose';
import Profile from './Profile';
import jwt, { SignCallback } from 'jsonwebtoken';
import { privateKey } from '../config/keys';

export interface AuthToken {
  id: mongoose.Schema.Types.ObjectId;
  isAdmin: boolean;
  isManager: boolean;
  organization: mongoose.Schema.Types.ObjectId | null;
  expiresIn: string;
}

type generateAuthTokenFunction = () => Promise<string>;

export type UserDocument = mongoose.Document & {
  type: string;
  email: string;
  password: string;

  generateAuthToken: generateAuthTokenFunction;
};

const userSchema = new mongoose.Schema(
  {
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
    }
  },
  { timestamps: true }
);

const generateAuthToken: generateAuthTokenFunction = function () {
  return new Promise((resolve, reject) => {
    Profile.findOne({ user: this.id })
      .then(profile => {
        // vars to set access level in jwt payload
        let isAdmin = false,
          isManager = false,
          organization = null;
        if (profile) {
          isAdmin = profile.isAdmin;
          isManager = profile.isManager;
          organization = profile.organization;
        }

        const userJwtPayload: AuthToken = {
          id: this.id,
          isAdmin,
          isManager,
          organization,
          expiresIn: '2 days'
        };

        const cb: SignCallback = (err, token) => {
          if (err) reject(err);
          resolve(token);
        };

        jwt.sign({ user: userJwtPayload }, privateKey, cb);
      })
      .catch(err => reject(err));
  });
};

userSchema.methods.generateAuthToken = generateAuthToken;

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
