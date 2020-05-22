import mongoose from 'mongoose';

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type ProfileDocument = mongoose.Document & {
  user: mongoose.Schema.Types.ObjectId;
  organization: mongoose.Schema.Types.ObjectId;
  isManager: boolean;
  isAdmin: boolean;
  name: string;
  address: Address;
  phone: string;
  birthday: Date;
  gender: string;
  ssn: string;
};

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  { id: false, _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    ssn: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema);
export default Profile;
