import { Document, Schema, model } from 'mongoose';
import Profile from './Profile';
import jwt, { SignCallback } from 'jsonwebtoken';
import { privateKey } from '../config/keys';

const userSchema = new Schema(
  {
    type: {
      type: Number,
      required: true,
      default: 0,
      enum: [0, 1]
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

// TODO: export this type for working with client accounts
enum UserType {
  Worker = 0,
  Client = 1
}

interface IUserSchema extends Document {
  type: UserType;
  email: string;
  password: string;
}

interface IAuthToken {
  id: Schema.Types.ObjectId;
  isAdmin: boolean;
  isManager: boolean;
  organization: Schema.Types.ObjectId | null;
  expiresIn: string;
}

const generateAuthToken: () => Promise<string> = function () {
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

        const userJwtPayload: IAuthToken = {
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

export interface IUser extends IUserSchema {
  generateAuthToken(): Promise<string>;
}

export default model<IUser>('User', userSchema);
