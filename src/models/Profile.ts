import { Document, Schema, model } from 'mongoose';
import { IUser } from './User';
import { IOrg } from './Organization';

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  { id: false, _id: false }
);

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    },
    isManager: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    address: addressSchema,
    phone: {
      type: String,
      required: true
    },
    birthday: {
      type: Date,
      required: true
    },
    gender: {
      type: Number,
      enum: [0, 1],
      required: true
    },
    ssn: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

enum Gender {
  Male = 1,
  Female = 0
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface IProfile extends Document {
  user: IUser['_id'];
  organization: IOrg['_id'];
  isManager: boolean;
  isAdmin: boolean;
  name: string;
  address: IAddress;
  phone: string;
  birthday: Date;
  gender: Gender;
  ssn: string;
}

export default model<IProfile>('Profile', profileSchema);
